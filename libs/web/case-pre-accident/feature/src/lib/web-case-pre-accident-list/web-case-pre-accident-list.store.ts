

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, CasePreAccident, CorePaging, UserUpdateCasePreAccidentInput ,LegalCase } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { CasePreAccidentService } from '@case-clinical/web/case-pre-accident/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface CasePreAccidentListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
legalCaseId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: CasePreAccident[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebCasePreAccidentListStore extends ComponentStore<CasePreAccidentListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly casePreAccidentService: CasePreAccidentService,
        private readonly toast: WebUiToastService,
         private readonly legalCaseStore: WebLegalCaseFeatureStore
    ) {
    super({
      headerTitle: 'CasePreAccidents',
      searchFocused: false,
      searchQuery: '',
legalCaseId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.router.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }

    this.legalCaseStore.loadLegalCasesEffect()
  }

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: { ...state.paging, skip }
  }))

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  readonly setSearchBarInFocus = this.updater((state, searchFocused: boolean) => ({
    ...state,
    searchFocused
  }))


            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

legalCases$ = this.legalCaseStore.legalCases$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.legalCaseId$, this.searchQuery$, (paging, legalCaseId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.legalCaseId$,
    this.data$,
    this.legalCases$,
    (paging, errors, loading, searchFocused, searchQuery, legalCaseId, data ,legalCases) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      legalCaseId,
      data,
      legalCases
    }),
  )

    addCasePreAccidents = this.updater((state, casePreAccidents: any[]) => ({...state, data: state.data.concat(casePreAccidents) }))
    updateCasePreAccidents = this.updater((state, casePreAccidents: any[]) => {
        return {
            ...state,
            data: state.data.map((casePreAccident) => {
            const updated = casePreAccidents.find((el) => el.id === casePreAccident.id);
            return updated ? updated : casePreAccident;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const legalCases = vm.legalCases;
        return this.casePreAccidentService.validateCasePreAccidentExcelData(excelData,legalCases);
      })
    )
  }


  readonly loadCasePreAccidentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCasePreAccidents({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                data: res.data.items,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

readonly importExcelEffect = this.effect<UserUpdateCasePreAccidentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.casePreAccidentService.importCasePreAccidents(data).pipe(
        catchError(error => {
          console.log(error)
          this.toast.error(error.Message ?? 'Failed to save', {duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addCasePreAccidents(created);
            this.updateCasePreAccidents(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

