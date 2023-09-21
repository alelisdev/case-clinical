

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Insurance, CorePaging, UserUpdateInsuranceInput ,LegalCase, InsuranceType, InsuranceSector } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { InsuranceService } from '@case-clinical/web/insurance/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebInsuranceTypeFeatureStore } from '@case-clinical/web/insurance-type/shared'
import { WebInsuranceSectorFeatureStore } from '@case-clinical/web/insurance-sector/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface InsuranceListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
legalCaseId?: string,insuranceTypeId?: string,insuranceSectorId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Insurance[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebInsuranceListStore extends ComponentStore<InsuranceListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly insuranceService: InsuranceService,
        private readonly toast: WebUiToastService,
         private readonly legalCaseStore: WebLegalCaseFeatureStore,
 private readonly insuranceTypeStore: WebInsuranceTypeFeatureStore,
 private readonly insuranceSectorStore: WebInsuranceSectorFeatureStore
    ) {
    super({
      headerTitle: 'Insurances',
      searchFocused: false,
      searchQuery: '',
legalCaseId: undefined,
insuranceTypeId: undefined,
insuranceSectorId: undefined,
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


    if(this.router.snapshot.paramMap.has("insuranceTypeId")) {
      var insuranceTypeId = this.router.snapshot.paramMap.get("insuranceTypeId")
      this.setInsuranceTypeId(insuranceTypeId)
    }


    if(this.router.snapshot.paramMap.has("insuranceSectorId")) {
      var insuranceSectorId = this.router.snapshot.paramMap.get("insuranceSectorId")
      this.setInsuranceSectorId(insuranceSectorId)
    }

    this.legalCaseStore.loadLegalCasesEffect()
this.insuranceTypeStore.loadInsuranceTypesEffect()
this.insuranceSectorStore.loadInsuranceSectorsEffect()
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


            readonly setInsuranceTypeId = this.updater((state, insuranceTypeId: string) => ({
                ...state,
    insuranceTypeId,
  }))


            readonly setInsuranceSectorId = this.updater((state, insuranceSectorId: string) => ({
                ...state,
    insuranceSectorId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly insuranceTypeId$ = this.select((s) => s.insuranceTypeId)

readonly insuranceSectorId$ = this.select((s) => s.insuranceSectorId)

legalCases$ = this.legalCaseStore.legalCases$
insuranceTypes$ = this.insuranceTypeStore.insuranceTypes$
insuranceSectors$ = this.insuranceSectorStore.insuranceSectors$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.insuranceTypeId$,
this.insuranceSectorId$, this.searchQuery$, (paging, legalCaseId,
insuranceTypeId,
insuranceSectorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,insuranceTypeId: insuranceTypeId,insuranceSectorId: insuranceSectorId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.legalCaseId$,
this.insuranceTypeId$,
this.insuranceSectorId$,
    this.data$,
    this.legalCases$,
this.insuranceTypes$,
this.insuranceSectors$,
    (paging, errors, loading, searchFocused, searchQuery, legalCaseId,
insuranceTypeId,
insuranceSectorId, data ,legalCases,insuranceTypes,insuranceSectors) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      legalCaseId,
insuranceTypeId,
insuranceSectorId,
      data,
      legalCases,insuranceTypes,insuranceSectors
    }),
  )

    addInsurances = this.updater((state, insurances: any[]) => ({...state, data: state.data.concat(insurances) }))
    updateInsurances = this.updater((state, insurances: any[]) => {
        return {
            ...state,
            data: state.data.map((insurance) => {
            const updated = insurances.find((el) => el.id === insurance.id);
            return updated ? updated : insurance;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const legalCases = vm.legalCases;
const insuranceTypes = vm.insuranceTypes;
const insuranceSectors = vm.insuranceSectors;
        return this.insuranceService.validateInsuranceExcelData(excelData,legalCases,insuranceTypes,insuranceSectors);
      })
    )
  }


  readonly loadInsurancesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInsurances({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateInsuranceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.insuranceService.importInsurances(data).pipe(
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

            this.addInsurances(created);
            this.updateInsurances(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

