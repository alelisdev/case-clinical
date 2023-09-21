

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, CaseProcedure, CorePaging, UserUpdateCaseProcedureInput ,LegalCase, Location } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { CaseProcedureService } from '@case-clinical/web/case-procedure/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface CaseProcedureListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
  legalCaseId?: string,
  locationId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: CaseProcedure[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebCaseProcedureListStore extends ComponentStore<CaseProcedureListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly caseProcedureService: CaseProcedureService,
        private readonly toast: WebUiToastService,
         private readonly legalCaseStore: WebLegalCaseFeatureStore,
 private readonly locationStore: WebLocationFeatureStore
    ) {
    super({
      headerTitle: 'CaseProcedures',
      searchFocused: false,
      searchQuery: '',
legalCaseId: undefined,
locationId: undefined,
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


    if(this.router.snapshot.paramMap.has("locationId")) {
      var locationId = this.router.snapshot.paramMap.get("locationId")
      this.setLocationId(locationId)
    }

    this.legalCaseStore.loadLegalCasesEffect()
    this.locationStore.loadLocationsEffect()
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


            readonly setLocationId = this.updater((state, locationId: string) => ({
                ...state,
    locationId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly locationId$ = this.select((s) => s.locationId)

legalCases$ = this.legalCaseStore.legalCases$
locations$ = this.locationStore.locations$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.locationId$, this.searchQuery$, (paging, legalCaseId,
locationId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,locationId: locationId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.legalCaseId$,
this.locationId$,
    this.data$,
    this.legalCases$,
this.locations$,
    (paging, errors, loading, searchFocused, searchQuery, legalCaseId,
locationId, data ,legalCases,locations) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      legalCaseId,
locationId,
      data,
      legalCases,locations
    }),
  )

    addCaseProcedures = this.updater((state, caseProcedures: any[]) => ({...state, data: state.data.concat(caseProcedures) }))
    updateCaseProcedures = this.updater((state, caseProcedures: any[]) => {
        return {
            ...state,
            data: state.data.map((caseProcedure) => {
            const updated = caseProcedures.find((el) => el.id === caseProcedure.id);
            return updated ? updated : caseProcedure;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const legalCases = vm.legalCases;
const locations = vm.locations;
        //const appointments = vm.appointments;
        return this.caseProcedureService.validateCaseProcedureExcelData(excelData, legalCases, [],locations);
      })
    )
  }


  readonly loadCaseProceduresEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        {
          console.log('hit the load effect')
          return this.data.userSelectDetailCaseProcedures({input}).pipe(
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
              })
          ),
        )},
      ),
    ),
  )

readonly importExcelEffect = this.effect<UserUpdateCaseProcedureInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.caseProcedureService.importCaseProcedures(data).pipe(
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

            this.addCaseProcedures(created);
            this.updateCaseProcedures(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

