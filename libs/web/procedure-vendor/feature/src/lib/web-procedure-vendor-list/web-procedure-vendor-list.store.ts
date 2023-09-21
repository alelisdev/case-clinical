

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ProcedureVendor, CorePaging, UserUpdateProcedureVendorInput ,CaseProcedure, Contract, Vendor } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ProcedureVendorService } from '@case-clinical/web/procedure-vendor/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ProcedureVendorListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
procedureId?: string,contractId?: string,vendorId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ProcedureVendor[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebProcedureVendorListStore extends ComponentStore<ProcedureVendorListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly procedureVendorService: ProcedureVendorService,
        private readonly toast: WebUiToastService,
         private readonly caseProcedureStore: WebCaseProcedureFeatureStore,
 private readonly contractStore: WebContractFeatureStore,
 private readonly vendorStore: WebVendorFeatureStore
    ) {
    super({
      headerTitle: 'ProcedureVendors',
      searchFocused: false,
      searchQuery: '',
procedureId: undefined,
contractId: undefined,
vendorId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.router.snapshot.paramMap.get("procedureId")
      this.setProcedureId(procedureId)
    }


    if(this.router.snapshot.paramMap.has("contractId")) {
      var contractId = this.router.snapshot.paramMap.get("contractId")
      this.setContractId(contractId)
    }


    if(this.router.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.router.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }

    this.caseProcedureStore.loadCaseProceduresEffect()
this.contractStore.loadContractsEffect()
this.vendorStore.loadVendorsEffect()
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


            readonly setProcedureId = this.updater((state, procedureId: string) => ({
                ...state,
    procedureId,
  }))


            readonly setContractId = this.updater((state, contractId: string) => ({
                ...state,
    contractId,
  }))


            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly procedureId$ = this.select((s) => s.procedureId)

readonly contractId$ = this.select((s) => s.contractId)

readonly vendorId$ = this.select((s) => s.vendorId)

caseProcedures$ = this.caseProcedureStore.caseProcedures$
contracts$ = this.contractStore.contracts$
vendors$ = this.vendorStore.vendors$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.procedureId$,
this.contractId$,
this.vendorId$, this.searchQuery$, (paging, procedureId,
contractId,
vendorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    procedureId: procedureId,contractId: contractId,vendorId: vendorId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.procedureId$,
this.contractId$,
this.vendorId$,
    this.data$,
    this.caseProcedures$,
this.contracts$,
this.vendors$,
    (paging, errors, loading, searchFocused, searchQuery, procedureId,
contractId,
vendorId, data ,caseProcedures,contracts,vendors) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      procedureId,
contractId,
vendorId,
      data,
      caseProcedures,contracts,vendors
    }),
  )

    addProcedureVendors = this.updater((state, procedureVendors: any[]) => ({...state, data: state.data.concat(procedureVendors) }))
    updateProcedureVendors = this.updater((state, procedureVendors: any[]) => {
        return {
            ...state,
            data: state.data.map((procedureVendor) => {
            const updated = procedureVendors.find((el) => el.id === procedureVendor.id);
            return updated ? updated : procedureVendor;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const caseProcedures = vm.caseProcedures;
const contracts = vm.contracts;
const vendors = vm.vendors;
        return this.procedureVendorService.validateProcedureVendorExcelData(excelData,caseProcedures,contracts,vendors);
      })
    )
  }


  readonly loadProcedureVendorsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureVendors({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateProcedureVendorInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureVendorService.importProcedureVendors(data).pipe(
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

            this.addProcedureVendors(created);
            this.updateProcedureVendors(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

