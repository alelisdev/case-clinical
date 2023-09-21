

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, CaseAccount, CorePaging, UserUpdateCaseAccountInput ,LegalCase, Location, Vendor, AccountStatus, ProcedureType, AgreementType, User, Contract, Portfolio, ProcedureVendor } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { CaseAccountService } from '@case-clinical/web/case-account/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebAccountStatusFeatureStore } from '@case-clinical/web/account-status/shared'
import { WebProcedureTypeFeatureStore } from '@case-clinical/web/procedure-type/shared'
import { WebAgreementTypeFeatureStore } from '@case-clinical/web/agreement-type/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebPortfolioFeatureStore } from '@case-clinical/web/portfolio/shared'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface CaseAccountListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
legalCaseId?: string,locationId?: string,vendorId?: string,accountStatusId?: string,procedureTypeId?: string,agreementTypeId?: string,accountAgentId?: string,contractId?: string,portfolioId?: string,procedureVendorId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: CaseAccount[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebCaseAccountListStore extends ComponentStore<CaseAccountListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly caseAccountService: CaseAccountService,
        private readonly toast: WebUiToastService,
         private readonly legalCaseStore: WebLegalCaseFeatureStore,
 private readonly locationStore: WebLocationFeatureStore,
 private readonly vendorStore: WebVendorFeatureStore,
 private readonly accountStatusStore: WebAccountStatusFeatureStore,
 private readonly procedureTypeStore: WebProcedureTypeFeatureStore,
 private readonly agreementTypeStore: WebAgreementTypeFeatureStore,
 private readonly userStore: WebUserFeatureStore,
 private readonly contractStore: WebContractFeatureStore,
 private readonly portfolioStore: WebPortfolioFeatureStore,
 private readonly procedureVendorStore: WebProcedureVendorFeatureStore
    ) {
    super({
      headerTitle: 'CaseAccounts',
      searchFocused: false,
      searchQuery: '',
legalCaseId: undefined,
locationId: undefined,
vendorId: undefined,
accountStatusId: undefined,
procedureTypeId: undefined,
agreementTypeId: undefined,
accountAgentId: undefined,
contractId: undefined,
portfolioId: undefined,
procedureVendorId: undefined,
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


    if(this.router.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.router.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }


    if(this.router.snapshot.paramMap.has("accountStatusId")) {
      var accountStatusId = this.router.snapshot.paramMap.get("accountStatusId")
      this.setAccountStatusId(accountStatusId)
    }


    if(this.router.snapshot.paramMap.has("procedureTypeId")) {
      var procedureTypeId = this.router.snapshot.paramMap.get("procedureTypeId")
      this.setProcedureTypeId(procedureTypeId)
    }


    if(this.router.snapshot.paramMap.has("agreementTypeId")) {
      var agreementTypeId = this.router.snapshot.paramMap.get("agreementTypeId")
      this.setAgreementTypeId(agreementTypeId)
    }


    if(this.router.snapshot.paramMap.has("accountAgentId")) {
      var accountAgentId = this.router.snapshot.paramMap.get("accountAgentId")
      this.setAccountAgentId(accountAgentId)
    }


    if(this.router.snapshot.paramMap.has("contractId")) {
      var contractId = this.router.snapshot.paramMap.get("contractId")
      this.setContractId(contractId)
    }


    if(this.router.snapshot.paramMap.has("portfolioId")) {
      var portfolioId = this.router.snapshot.paramMap.get("portfolioId")
      this.setPortfolioId(portfolioId)
    }


    if(this.router.snapshot.paramMap.has("procedureVendorId")) {
      var procedureVendorId = this.router.snapshot.paramMap.get("procedureVendorId")
      this.setProcedureVendorId(procedureVendorId)
    }

    this.legalCaseStore.loadLegalCasesEffect()
this.locationStore.loadLocationsEffect()
this.vendorStore.loadVendorsEffect()
this.accountStatusStore.loadAccountStatusesEffect()
this.procedureTypeStore.loadProcedureTypesEffect()
this.agreementTypeStore.loadAgreementTypesEffect()
this.userStore.loadUsersEffect()
this.contractStore.loadContractsEffect()
this.portfolioStore.loadPortfoliosEffect()
this.procedureVendorStore.loadProcedureVendorsEffect()
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


            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))


            readonly setAccountStatusId = this.updater((state, accountStatusId: string) => ({
                ...state,
    accountStatusId,
  }))


            readonly setProcedureTypeId = this.updater((state, procedureTypeId: string) => ({
                ...state,
    procedureTypeId,
  }))


            readonly setAgreementTypeId = this.updater((state, agreementTypeId: string) => ({
                ...state,
    agreementTypeId,
  }))


            readonly setAccountAgentId = this.updater((state, accountAgentId: string) => ({
                ...state,
    accountAgentId,
  }))


            readonly setContractId = this.updater((state, contractId: string) => ({
                ...state,
    contractId,
  }))


            readonly setPortfolioId = this.updater((state, portfolioId: string) => ({
                ...state,
    portfolioId,
  }))


            readonly setProcedureVendorId = this.updater((state, procedureVendorId: string) => ({
                ...state,
    procedureVendorId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly locationId$ = this.select((s) => s.locationId)

readonly vendorId$ = this.select((s) => s.vendorId)

readonly accountStatusId$ = this.select((s) => s.accountStatusId)

readonly procedureTypeId$ = this.select((s) => s.procedureTypeId)

readonly agreementTypeId$ = this.select((s) => s.agreementTypeId)

readonly accountAgentId$ = this.select((s) => s.accountAgentId)

readonly contractId$ = this.select((s) => s.contractId)

readonly portfolioId$ = this.select((s) => s.portfolioId)

readonly procedureVendorId$ = this.select((s) => s.procedureVendorId)

legalCases$ = this.legalCaseStore.legalCases$
locations$ = this.locationStore.locations$
vendors$ = this.vendorStore.vendors$
accountStatuses$ = this.accountStatusStore.accountStatuses$
procedureTypes$ = this.procedureTypeStore.procedureTypes$
agreementTypes$ = this.agreementTypeStore.agreementTypes$
users$ = this.userStore.users$
contracts$ = this.contractStore.contracts$
portfolios$ = this.portfolioStore.portfolios$
procedureVendors$ = this.procedureVendorStore.procedureVendors$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.locationId$,
this.vendorId$,
this.accountStatusId$,
this.procedureTypeId$,
this.agreementTypeId$,
this.accountAgentId$,
this.contractId$,
this.portfolioId$,
this.procedureVendorId$, this.searchQuery$, (paging, legalCaseId,
locationId,
vendorId,
accountStatusId,
procedureTypeId,
agreementTypeId,
accountAgentId,
contractId,
portfolioId,
procedureVendorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,locationId: locationId,vendorId: vendorId,accountStatusId: accountStatusId,procedureTypeId: procedureTypeId,agreementTypeId: agreementTypeId,accountAgentId: accountAgentId,contractId: contractId,portfolioId: portfolioId,procedureVendorId: procedureVendorId,
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
this.vendorId$,
this.accountStatusId$,
this.procedureTypeId$,
this.agreementTypeId$,
this.accountAgentId$,
this.contractId$,
this.portfolioId$,
this.procedureVendorId$,
    this.data$,
    this.legalCases$,
this.locations$,
this.vendors$,
this.accountStatuses$,
this.procedureTypes$,
this.agreementTypes$,
this.users$,
this.contracts$,
this.portfolios$,
this.procedureVendors$,
    (paging, errors, loading, searchFocused, searchQuery, legalCaseId,
locationId,
vendorId,
accountStatusId,
procedureTypeId,
agreementTypeId,
accountAgentId,
contractId,
portfolioId,
procedureVendorId, data ,legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,users,contracts,portfolios,procedureVendors) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      legalCaseId,
locationId,
vendorId,
accountStatusId,
procedureTypeId,
agreementTypeId,
accountAgentId,
contractId,
portfolioId,
procedureVendorId,
      data,
      legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,users,contracts,portfolios,procedureVendors
    }),
  )

    addCaseAccounts = this.updater((state, caseAccounts: any[]) => ({...state, data: state.data.concat(caseAccounts) }))
    updateCaseAccounts = this.updater((state, caseAccounts: any[]) => {
        return {
            ...state,
            data: state.data.map((caseAccount) => {
            const updated = caseAccounts.find((el) => el.id === caseAccount.id);
            return updated ? updated : caseAccount;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const legalCases = vm.legalCases;
const locations = vm.locations;
const vendors = vm.vendors;
const accountStatuses = vm.accountStatuses;
const procedureTypes = vm.procedureTypes;
const agreementTypes = vm.agreementTypes;
const users = vm.users;
const contracts = vm.contracts;
const portfolios = vm.portfolios;
const procedureVendors = vm.procedureVendors;
        return this.caseAccountService.validateCaseAccountExcelData(excelData,legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,users,contracts,portfolios,procedureVendors);
      })
    )
  }


  readonly loadCaseAccountsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCaseAccounts({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateCaseAccountInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.caseAccountService.importCaseAccounts(data).pipe(
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

            this.addCaseAccounts(created);
            this.updateCaseAccounts(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

