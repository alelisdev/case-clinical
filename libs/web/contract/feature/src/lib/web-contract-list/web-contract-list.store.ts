

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Contract, CorePaging, UserUpdateContractInput ,Organization, Template, Vendor, ReconciliationPeriodType, CalculationBasisType, Process } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ContractService } from '@case-clinical/web/contract/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebReconciliationPeriodTypeFeatureStore } from '@case-clinical/web/reconciliation-period-type/shared'
import { WebCalculationBasisTypeFeatureStore } from '@case-clinical/web/calculation-basis-type/shared'
import { WebProcessFeatureStore } from '@case-clinical/web/process/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ContractListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
organizationId?: string,billingOrganizationId?: string,templateId?: string,vendorId?: string,reconciliationPeriodTypeId?: string,calculationBasisTypeId?: string,processId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Contract[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebContractListStore extends ComponentStore<ContractListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly contractService: ContractService,
        private readonly toast: WebUiToastService,
         private readonly organizationStore: WebOrganizationFeatureStore,
 private readonly vendorStore: WebVendorFeatureStore,
 private readonly reconciliationPeriodTypeStore: WebReconciliationPeriodTypeFeatureStore,
 private readonly calculationBasisTypeStore: WebCalculationBasisTypeFeatureStore,
 private readonly processStore: WebProcessFeatureStore
    ) {
    super({
      headerTitle: 'Contracts',
      searchFocused: false,
      searchQuery: '',
organizationId: undefined,
billingOrganizationId: undefined,
templateId: undefined,
vendorId: undefined,
reconciliationPeriodTypeId: undefined,
calculationBasisTypeId: undefined,
processId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("organizationId")) {
      var organizationId = this.router.snapshot.paramMap.get("organizationId")
      this.setOrganizationId(organizationId)
    }


    if(this.router.snapshot.paramMap.has("billingOrganizationId")) {
      var billingOrganizationId = this.router.snapshot.paramMap.get("billingOrganizationId")
      this.setBillingOrganizationId(billingOrganizationId)
    }


    if(this.router.snapshot.paramMap.has("templateId")) {
      var templateId = this.router.snapshot.paramMap.get("templateId")
      this.setTemplateId(templateId)
    }


    if(this.router.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.router.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }


    if(this.router.snapshot.paramMap.has("reconciliationPeriodTypeId")) {
      var reconciliationPeriodTypeId = this.router.snapshot.paramMap.get("reconciliationPeriodTypeId")
      this.setReconciliationPeriodTypeId(reconciliationPeriodTypeId)
    }


    if(this.router.snapshot.paramMap.has("calculationBasisTypeId")) {
      var calculationBasisTypeId = this.router.snapshot.paramMap.get("calculationBasisTypeId")
      this.setCalculationBasisTypeId(calculationBasisTypeId)
    }


    if(this.router.snapshot.paramMap.has("processId")) {
      var processId = this.router.snapshot.paramMap.get("processId")
      this.setProcessId(processId)
    }

    this.organizationStore.loadOrganizationsEffect()
this.vendorStore.loadVendorsEffect()
this.reconciliationPeriodTypeStore.loadReconciliationPeriodTypesEffect()
this.calculationBasisTypeStore.loadCalculationBasisTypesEffect()
this.processStore.loadProcessesEffect()
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


            readonly setOrganizationId = this.updater((state, organizationId: string) => ({
                ...state,
    organizationId,
  }))


            readonly setBillingOrganizationId = this.updater((state, billingOrganizationId: string) => ({
                ...state,
    billingOrganizationId,
  }))


            readonly setTemplateId = this.updater((state, templateId: string) => ({
                ...state,
    templateId,
  }))


            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))


            readonly setReconciliationPeriodTypeId = this.updater((state, reconciliationPeriodTypeId: string) => ({
                ...state,
    reconciliationPeriodTypeId,
  }))


            readonly setCalculationBasisTypeId = this.updater((state, calculationBasisTypeId: string) => ({
                ...state,
    calculationBasisTypeId,
  }))


            readonly setProcessId = this.updater((state, processId: string) => ({
                ...state,
    processId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly organizationId$ = this.select((s) => s.organizationId)

readonly billingOrganizationId$ = this.select((s) => s.billingOrganizationId)

readonly templateId$ = this.select((s) => s.templateId)

readonly vendorId$ = this.select((s) => s.vendorId)

readonly reconciliationPeriodTypeId$ = this.select((s) => s.reconciliationPeriodTypeId)

readonly calculationBasisTypeId$ = this.select((s) => s.calculationBasisTypeId)

readonly processId$ = this.select((s) => s.processId)

organizations$ = this.organizationStore.organizations$
billingOrganizations$ = this.organizationStore.organizations$
vendors$ = this.vendorStore.vendors$
reconciliationPeriodTypes$ = this.reconciliationPeriodTypeStore.reconciliationPeriodTypes$
calculationBasisTypes$ = this.calculationBasisTypeStore.calculationBasisTypes$
processes$ = this.processStore.processes$

  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.organizationId$,
this.billingOrganizationId$,
this.templateId$,
this.vendorId$,
this.reconciliationPeriodTypeId$,
this.calculationBasisTypeId$,
this.processId$, this.searchQuery$, (paging, organizationId,
billingOrganizationId,
templateId,
vendorId,
reconciliationPeriodTypeId,
calculationBasisTypeId,
processId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    organizationId: organizationId,billingOrganizationId: billingOrganizationId,templateId: templateId,vendorId: vendorId,reconciliationPeriodTypeId: reconciliationPeriodTypeId,calculationBasisTypeId: calculationBasisTypeId,processId: processId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.organizationId$,
this.billingOrganizationId$,
this.templateId$,
this.vendorId$,
this.reconciliationPeriodTypeId$,
this.calculationBasisTypeId$,
this.processId$,
    this.data$,
    this.organizations$,
this.organizations$,
this.vendors$,
this.reconciliationPeriodTypes$,
this.calculationBasisTypes$,
this.processes$,
    (paging, errors, loading, searchFocused, searchQuery, organizationId,
billingOrganizationId,
templateId,
vendorId,
reconciliationPeriodTypeId,
calculationBasisTypeId,
processId, data ,organizations,billingOrganizations,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      organizationId,
billingOrganizationId,
templateId,
vendorId,
reconciliationPeriodTypeId,
calculationBasisTypeId,
processId,
      data,
      organizations,billingOrganizations,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes
    }),
  )

    addContracts = this.updater((state, contracts: any[]) => ({...state, data: state.data.concat(contracts) }))
    updateContracts = this.updater((state, contracts: any[]) => {
        return {
            ...state,
            data: state.data.map((contract) => {
            const updated = contracts.find((el) => el.id === contract.id);
            return updated ? updated : contract;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const organizations = vm.organizations;
        const billingOrganizations = vm.organizations;
const vendors = vm.vendors;
const reconciliationPeriodTypes = vm.reconciliationPeriodTypes;
const calculationBasisTypes = vm.calculationBasisTypes;
const processes = vm.processes;
        return this.contractService.validateContractExcelData(excelData,organizations, billingOrganizations,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes);
      })
    )
  }


  readonly loadContractsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContracts({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateContractInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractService.importContracts(data).pipe(
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

            this.addContracts(created);
            this.updateContracts(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

