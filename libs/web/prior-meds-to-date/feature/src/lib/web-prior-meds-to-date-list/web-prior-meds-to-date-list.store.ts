

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorMedsToDate, CorePaging, UserUpdatePriorMedsToDateInput ,LegalCase, PriorMedsToDateStatus } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorMedsToDateService } from '@case-clinical/web/prior-meds-to-date/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorMedsToDateListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
legalCaseId?: string,priorMedsToDateStatusId?: string, specialtyId?: string,visitKindId?: string, 
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorMedsToDate[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorMedsToDateListStore extends ComponentStore<PriorMedsToDateListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorMedsToDateService: PriorMedsToDateService,
        private readonly toast: WebUiToastService,
         private readonly legalCaseStore: WebLegalCaseFeatureStore,
 private readonly priorMedsToDateStatusStore: WebPriorMedsToDateStatusFeatureStore,
 private readonly specialtyStore: WebSpecialtyFeatureStore,
 private readonly visitKindStore: WebVisitKindFeatureStore
    ) {
    super({
      headerTitle: 'PriorMedsToDates',
      searchFocused: false,
      searchQuery: '',
legalCaseId: undefined,
priorMedsToDateStatusId: undefined,
specialtyId: undefined,
visitKindId: undefined,
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


    if(this.router.snapshot.paramMap.has("priorMedsToDateStatusId")) {
      var priorMedsToDateStatusId = this.router.snapshot.paramMap.get("priorMedsToDateStatusId")
      this.setPriorMedsToDateStatusId(priorMedsToDateStatusId)
    }

    if(this.router.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.router.snapshot.paramMap.get("specialtyId")
      this.setSpecialtyId(specialtyId)
    }

    if(this.router.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.router.snapshot.paramMap.get("visitKindId")
      this.setVisitKindId(visitKindId)
    }

    this.legalCaseStore.loadLegalCasesEffect()
this.priorMedsToDateStatusStore.loadPriorMedsToDateStatusesEffect()
this.specialtyStore.loadSpecialtiesEffect()
this.visitKindStore.loadVisitKindsEffect()

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


            readonly setPriorMedsToDateStatusId = this.updater((state, priorMedsToDateStatusId: string) => ({
                ...state,
    priorMedsToDateStatusId,
  }))
  readonly setSpecialtyId = this.updater((state, specialtyId: string) => ({
    ...state,
    specialtyId,
}))

readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
  ...state,
  visitKindId,
}))

  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly priorMedsToDateStatusId$ = this.select((s) => s.priorMedsToDateStatusId)

readonly specialtyId$ = this.select((s) => s.specialtyId)
readonly visitKindId$ = this.select((s) => s.visitKindId)


legalCases$ = this.legalCaseStore.legalCases$
priorMedsToDateStatuses$ = this.priorMedsToDateStatusStore.priorMedsToDateStatuses$
specialties$ = this.specialtyStore.specialties$
visitKinds$ = this.visitKindStore.visitKinds$

  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.priorMedsToDateStatusId$, this.specialtyId$, this.visitKindId$, this.searchQuery$, (paging, legalCaseId,
priorMedsToDateStatusId,specialtyId,visitKindId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,priorMedsToDateStatusId: priorMedsToDateStatusId,
    specialtyId:specialtyId,
    visitKindId:visitKindId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.legalCaseId$,
    
this.priorMedsToDateStatusId$,
this.specialtyId$, 
    this.visitKindId$,
    this.data$,
    this.legalCases$,
this.priorMedsToDateStatuses$,
this.specialties$,
this.visitKinds$,
    (paging, errors, loading, searchFocused, searchQuery, legalCaseId,
priorMedsToDateStatusId,specialtyId, visitKindId, data ,legalCases,priorMedsToDateStatuses, specialties, visitKinds) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      legalCaseId,
priorMedsToDateStatusId,
specialtyId, visitKindId,
      data,
      legalCases,priorMedsToDateStatuses,
      specialties, visitKinds
    }),
  )

    addPriorMedsToDates = this.updater((state, priorMedsToDates: any[]) => ({...state, data: state.data.concat(priorMedsToDates) }))
    updatePriorMedsToDates = this.updater((state, priorMedsToDates: any[]) => {
        return {
            ...state,
            data: state.data.map((priorMedsToDate) => {
            const updated = priorMedsToDates.find((el) => el.id === priorMedsToDate.id);
            return updated ? updated : priorMedsToDate;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const legalCases = vm.legalCases;
const priorMedsToDateStatuses = vm.priorMedsToDateStatuses;
        return this.priorMedsToDateService.validatePriorMedsToDateExcelData(excelData,legalCases,priorMedsToDateStatuses);
      })
    )
  }


  readonly loadPriorMedsToDatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorMedsToDates({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorMedsToDateInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorMedsToDateService.importPriorMedsToDates(data).pipe(
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

            this.addPriorMedsToDates(created);
            this.updatePriorMedsToDates(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

