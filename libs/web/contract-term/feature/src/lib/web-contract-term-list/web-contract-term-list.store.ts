

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ContractTerm, CorePaging, UserUpdateContractTermInput ,Contract } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ContractTermService } from '@case-clinical/web/contract-term/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ContractTermListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
contractTermId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ContractTerm[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebContractTermListStore extends ComponentStore<ContractTermListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly contractTermService: ContractTermService,
        private readonly toast: WebUiToastService,
         private readonly contractStore: WebContractFeatureStore
    ) {
    super({
      headerTitle: 'ContractTerms',
      searchFocused: false,
      searchQuery: '',
contractTermId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("contractTermId")) {
      var contractTermId = this.router.snapshot.paramMap.get("contractTermId")
      this.setContractTermId(contractTermId)
    }

    this.contractStore.loadContractsEffect()
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


            readonly setContractTermId = this.updater((state, contractTermId: string) => ({
                ...state,
    contractTermId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly contractTermId$ = this.select((s) => s.contractTermId)

contracts$ = this.contractStore.contracts$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.contractTermId$, this.searchQuery$, (paging, contractTermId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contractTermId: contractTermId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.contractTermId$,
    this.data$,
    this.contracts$,
    (paging, errors, loading, searchFocused, searchQuery, contractTermId, data ,contracts) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      contractTermId,
      data,
      contracts
    }),
  )

    addContractTerms = this.updater((state, contractTerms: any[]) => ({...state, data: state.data.concat(contractTerms) }))
    updateContractTerms = this.updater((state, contractTerms: any[]) => {
        return {
            ...state,
            data: state.data.map((contractTerm) => {
            const updated = contractTerms.find((el) => el.id === contractTerm.id);
            return updated ? updated : contractTerm;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const contracts = vm.contracts;
        return this.contractTermService.validateContractTermExcelData(excelData,contracts);
      })
    )
  }


  readonly loadContractTermsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContractTerms({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateContractTermInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractTermService.importContractTerms(data).pipe(
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

            this.addContractTerms(created);
            this.updateContractTerms(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

