

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ContractedRate, CorePaging, UserUpdateContractedRateInput ,Contract, ContractedRateKind, ContractKind } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ContractedRateService } from '@case-clinical/web/contracted-rate/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebContractedRateKindFeatureStore } from '@case-clinical/web/contracted-rate-kind/shared'
import { WebContractKindFeatureStore } from '@case-clinical/web/contract-kind/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ContractedRateListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
contractId?: string,contractedRateKindId?: string,contractKindId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ContractedRate[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebContractedRateListStore extends ComponentStore<ContractedRateListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly contractedRateService: ContractedRateService,
        private readonly toast: WebUiToastService,
         private readonly contractStore: WebContractFeatureStore,
 private readonly contractedRateKindStore: WebContractedRateKindFeatureStore,
 private readonly contractKindStore: WebContractKindFeatureStore
    ) {
    super({
      headerTitle: 'ContractedRates',
      searchFocused: false,
      searchQuery: '',
contractId: undefined,
contractedRateKindId: undefined,
contractKindId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("contractId")) {
      var contractId = this.router.snapshot.paramMap.get("contractId")
      this.setContractId(contractId)
    }


    if(this.router.snapshot.paramMap.has("contractedRateKindId")) {
      var contractedRateKindId = this.router.snapshot.paramMap.get("contractedRateKindId")
      this.setContractedRateKindId(contractedRateKindId)
    }


    if(this.router.snapshot.paramMap.has("contractKindId")) {
      var contractKindId = this.router.snapshot.paramMap.get("contractKindId")
      this.setContractKindId(contractKindId)
    }

    this.contractStore.loadContractsEffect()
this.contractedRateKindStore.loadContractedRateKindsEffect()
this.contractKindStore.loadContractKindsEffect()
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


            readonly setContractId = this.updater((state, contractId: string) => ({
                ...state,
    contractId,
  }))


            readonly setContractedRateKindId = this.updater((state, contractedRateKindId: string) => ({
                ...state,
    contractedRateKindId,
  }))


            readonly setContractKindId = this.updater((state, contractKindId: string) => ({
                ...state,
    contractKindId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly contractId$ = this.select((s) => s.contractId)

readonly contractedRateKindId$ = this.select((s) => s.contractedRateKindId)

readonly contractKindId$ = this.select((s) => s.contractKindId)

contracts$ = this.contractStore.contracts$
contractedRateKinds$ = this.contractedRateKindStore.contractedRateKinds$
contractKinds$ = this.contractKindStore.contractKinds$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.contractId$,
this.contractedRateKindId$,
this.contractKindId$, this.searchQuery$, (paging, contractId,
contractedRateKindId,
contractKindId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contractId: contractId,contractedRateKindId: contractedRateKindId,contractKindId: contractKindId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.contractId$,
this.contractedRateKindId$,
this.contractKindId$,
    this.data$,
    this.contracts$,
this.contractedRateKinds$,
this.contractKinds$,
    (paging, errors, loading, searchFocused, searchQuery, contractId,
contractedRateKindId,
contractKindId, data ,contracts,contractedRateKinds,contractKinds) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      contractId,
contractedRateKindId,
contractKindId,
      data,
      contracts,contractedRateKinds,contractKinds
    }),
  )

    addContractedRates = this.updater((state, contractedRates: any[]) => ({...state, data: state.data.concat(contractedRates) }))
    updateContractedRates = this.updater((state, contractedRates: any[]) => {
        return {
            ...state,
            data: state.data.map((contractedRate) => {
            const updated = contractedRates.find((el) => el.id === contractedRate.id);
            return updated ? updated : contractedRate;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const contracts = vm.contracts;
const contractedRateKinds = vm.contractedRateKinds;
const contractKinds = vm.contractKinds;
        return this.contractedRateService.validateContractedRateExcelData(excelData,contracts,contractedRateKinds,contractKinds);
      })
    )
  }


  readonly loadContractedRatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContractedRates({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateContractedRateInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractedRateService.importContractedRates(data).pipe(
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

            this.addContractedRates(created);
            this.updateContractedRates(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

