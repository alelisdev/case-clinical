
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CaseAccountService } from './case-account.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCaseAccountInput, UserUpdateCaseAccountInput, WebCoreDataAccessService, CorePaging, CaseAccount, LegalCase,Location,Vendor,AccountStatus,ProcedureType,AgreementType,ClaimProcedure,InvoiceDetail,Contract,Portfolio,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CaseAccountFeatureState {
  errors?: any
  loading?: boolean
  item?: CaseAccount
  done: boolean,
  formName?: string
legalCaseId?: string,locationId?: string,vendorId?: string,accountStatusId?: string,procedureTypeId?: string,agreementTypeId?: string,claimProcedureId?: string,invoiceDetailId?: string,contractId?: string,portfolioId?: string,procedureVendorId?: string,
  caseAccounts: CaseAccount[]
 legalCases?: LegalCase[],
 locations?: Location[],
 vendors?: Vendor[],
 accountStatuses?: AccountStatus[],
 procedureTypes?: ProcedureType[],
 agreementTypes?: AgreementType[],
 claimProcedures?: ClaimProcedure[],
 invoiceDetails?: InvoiceDetail[],
 contracts?: Contract[],
 portfolios?: Portfolio[],
 procedureVendors?: ProcedureVendor[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCaseAccountFeatureStore extends ComponentStore<CaseAccountFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseAccountService: CaseAccountService
) {
    super({ 
      loading: false,
      caseAccounts: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
locationId: undefined,
vendorId: undefined,
accountStatusId: undefined,
procedureTypeId: undefined,
agreementTypeId: undefined,
claimProcedureId: undefined,
invoiceDetailId: undefined,
contractId: undefined,
portfolioId: undefined,
procedureVendorId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('caseAccountId')) {
      var caseAccountId = this.route.snapshot.paramMap.get('caseAccountId')
      this.setFormName('caseAccount_edit')
    } else {
      this.setFormName('caseAccount_create')
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }


    if(this.route.snapshot.paramMap.has("locationId")) {
      var locationId = this.route.snapshot.paramMap.get("locationId")
      this.setLocationId(locationId)
    }


    if(this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }


    if(this.route.snapshot.paramMap.has("accountStatusId")) {
      var accountStatusId = this.route.snapshot.paramMap.get("accountStatusId")
      this.setAccountStatusId(accountStatusId)
    }


    if(this.route.snapshot.paramMap.has("procedureTypeId")) {
      var procedureTypeId = this.route.snapshot.paramMap.get("procedureTypeId")
      this.setProcedureTypeId(procedureTypeId)
    }


    if(this.route.snapshot.paramMap.has("agreementTypeId")) {
      var agreementTypeId = this.route.snapshot.paramMap.get("agreementTypeId")
      this.setAgreementTypeId(agreementTypeId)
    }


    if(this.route.snapshot.paramMap.has("claimProcedureId")) {
      var claimProcedureId = this.route.snapshot.paramMap.get("claimProcedureId")
      this.setClaimProcedureId(claimProcedureId)
    }


    if(this.route.snapshot.paramMap.has("invoiceDetailId")) {
      var invoiceDetailId = this.route.snapshot.paramMap.get("invoiceDetailId")
      this.setInvoiceDetailId(invoiceDetailId)
    }


    if(this.route.snapshot.paramMap.has("contractId")) {
      var contractId = this.route.snapshot.paramMap.get("contractId")
      this.setContractId(contractId)
    }


    if(this.route.snapshot.paramMap.has("portfolioId")) {
      var portfolioId = this.route.snapshot.paramMap.get("portfolioId")
      this.setPortfolioId(portfolioId)
    }


    if(this.route.snapshot.paramMap.has("procedureVendorId")) {
      var procedureVendorId = this.route.snapshot.paramMap.get("procedureVendorId")
      this.setProcedureVendorId(procedureVendorId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly locations$ = this.select((s) => s.locations || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly accountStatuses$ = this.select((s) => s.accountStatuses || [])
  readonly procedureTypes$ = this.select((s) => s.procedureTypes || [])
  readonly agreementTypes$ = this.select((s) => s.agreementTypes || [])
  readonly claimProcedures$ = this.select((s) => s.claimProcedures || [])
  readonly invoiceDetails$ = this.select((s) => s.invoiceDetails || [])
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly portfolios$ = this.select((s) => s.portfolios || [])
  readonly procedureVendors$ = this.select((s) => s.procedureVendors || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly locationId$ = this.select((s) => s.locationId)

readonly vendorId$ = this.select((s) => s.vendorId)

readonly accountStatusId$ = this.select((s) => s.accountStatusId)

readonly procedureTypeId$ = this.select((s) => s.procedureTypeId)

readonly agreementTypeId$ = this.select((s) => s.agreementTypeId)

readonly claimProcedureId$ = this.select((s) => s.claimProcedureId)

readonly invoiceDetailId$ = this.select((s) => s.invoiceDetailId)

readonly contractId$ = this.select((s) => s.contractId)

readonly portfolioId$ = this.select((s) => s.portfolioId)

readonly procedureVendorId$ = this.select((s) => s.procedureVendorId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseAccounts$,
this.legalCases$,this.locations$,this.vendors$,this.accountStatuses$,this.procedureTypes$,this.agreementTypes$,this.claimProcedures$,this.invoiceDetails$,this.contracts$,this.portfolios$,this.procedureVendors$,
    (errors, loading, item, formName, caseAccounts, legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,claimProcedures,invoiceDetails,contracts,portfolios,procedureVendors ) => ({
    errors,
    loading,
    item,
    formName,
    caseAccounts,

            legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,claimProcedures,invoiceDetails,contracts,portfolios,procedureVendors
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.locationId$,
this.vendorId$,
this.accountStatusId$,
this.procedureTypeId$,
this.agreementTypeId$,
this.claimProcedureId$,
this.invoiceDetailId$,
this.contractId$,
this.portfolioId$,
this.procedureVendorId$, this.searchQuery$, (paging, legalCaseId,
locationId,
vendorId,
accountStatusId,
procedureTypeId,
agreementTypeId,
claimProcedureId,
invoiceDetailId,
contractId,
portfolioId,
procedureVendorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,locationId: locationId,vendorId: vendorId,accountStatusId: accountStatusId,procedureTypeId: procedureTypeId,agreementTypeId: agreementTypeId,claimProcedureId: claimProcedureId,invoiceDetailId: invoiceDetailId,contractId: contractId,portfolioId: portfolioId,procedureVendorId: procedureVendorId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
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


            readonly setClaimProcedureId = this.updater((state, claimProcedureId: string) => ({
                ...state,
    claimProcedureId,
  }))


            readonly setInvoiceDetailId = this.updater((state, invoiceDetailId: string) => ({
                ...state,
    invoiceDetailId,
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



  readonly filterLegalCases = (term) => 
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterLocations = (term) => 
        this.data.userSelectLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let locations = res.data.items;
              this.patchState({locations})
              return locations
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterVendors = (term) => 
        this.data.userSelectVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendors = res.data.items;
              this.patchState({vendors})
              return vendors
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterAccountStatuses = (term) => 
        this.data.userSelectAccountStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let accountStatuses = res.data.items;
              this.patchState({accountStatuses})
              return accountStatuses
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterProcedureTypes = (term) => 
        this.data.userSelectProcedureTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureTypes = res.data.items;
              this.patchState({procedureTypes})
              return procedureTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterAgreementTypes = (term) => 
        this.data.userSelectAgreementTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let agreementTypes = res.data.items;
              this.patchState({agreementTypes})
              return agreementTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterClaimProcedures = (term) => 
        this.data.userSelectClaimProcedures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let claimProcedures = res.data.items;
              this.patchState({claimProcedures})
              return claimProcedures
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterInvoiceDetails = (term) => 
        this.data.userSelectInvoiceDetails({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let invoiceDetails = res.data.items;
              this.patchState({invoiceDetails})
              return invoiceDetails
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterContracts = (term) => 
        this.data.userSelectContracts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contracts = res.data.items;
              this.patchState({contracts})
              return contracts
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterPortfolios = (term) => 
        this.data.userSelectPortfolios({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let portfolios = res.data.items;
              this.patchState({portfolios})
              return portfolios
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterProcedureVendors = (term) => 
        this.data.userSelectProcedureVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureVendors = res.data.items;
              this.patchState({procedureVendors})
              return procedureVendors
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addLocation = this.updater((state, location: Location) => ({
    ...state, locations: state.locations.concat(location)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))


  readonly addAccountStatus = this.updater((state, accountStatus: AccountStatus) => ({
    ...state, accountStatuses: state.accountStatuses.concat(accountStatus)
  }))


  readonly addProcedureType = this.updater((state, procedureType: ProcedureType) => ({
    ...state, procedureTypes: state.procedureTypes.concat(procedureType)
  }))


  readonly addAgreementType = this.updater((state, agreementType: AgreementType) => ({
    ...state, agreementTypes: state.agreementTypes.concat(agreementType)
  }))


  readonly addClaimProcedure = this.updater((state, claimProcedure: ClaimProcedure) => ({
    ...state, claimProcedures: state.claimProcedures.concat(claimProcedure)
  }))


  readonly addInvoiceDetail = this.updater((state, invoiceDetail: InvoiceDetail) => ({
    ...state, invoiceDetails: state.invoiceDetails.concat(invoiceDetail)
  }))


  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addPortfolio = this.updater((state, portfolio: Portfolio) => ({
    ...state, portfolios: state.portfolios.concat(portfolio)
  }))


  readonly addProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => ({
    ...state, procedureVendors: state.procedureVendors.concat(procedureVendor)
  }))

    

  readonly setItem = this.updater((state, item: CaseAccount) => ({...state, item}))

  addNewCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({ ...state, caseAccounts: [...state.caseAccounts, caseAccount] }))

  updateCaseAccount = this.updater((state, caseAccount: CaseAccount) => {
    return {
      ...state,
      caseAccounts: state.caseAccounts.map((el) => {
        if (el.id === caseAccount.id) {
          return caseAccount
        } else {
          return el
        }
      }),
    }
  })

  addCaseAccounts = this.updater((state, newCaseAccounts: any[]) => ({...state, caseAccounts: state.caseAccounts.concat(newCaseAccounts) }))
  updateCaseAccounts = this.updater((state, updatedCaseAccounts: any[]) => {
    return {
      ...state,
      caseAccounts: state.caseAccounts.map((caseAccount) => {
        const updated = updatedCaseAccounts.find((el) => el.id === caseAccount.id);
        return updated ? updated : caseAccount;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.caseAccountService.validateCaseAccountExcelData(excelData, vm.legalCases,vm.locations,vm.vendors,vm.accountStatuses,vm.procedureTypes,vm.agreementTypes,vm.claimProcedures,vm.invoiceDetails,vm.contracts,vm.portfolios,vm.procedureVendors);
      })
    )
  }


  readonly loadCaseAccountEffect = this.effect<string>((caseAccountId$) =>
    caseAccountId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((caseAccountId) =>
        this.data.userCaseAccount({ caseAccountId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
            },
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
                caseAccounts: res.data.items,
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

  readonly createCaseAccountEffect = this.effect<UserCreateCaseAccountInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.caseAccountService.createCaseAccount({...input }).pipe(
          tapResponse(
            (caseAccount: CaseAccount) => {
              this.addNewCaseAccount(caseAccount)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: caseAccount, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updateCaseAccountEffect = this.effect<UserUpdateCaseAccountInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.caseAccountService.updateCaseAccount(input, input.id).pipe(
              tapResponse(
                (caseAccount) => {
                  this.updateCaseAccount(caseAccount)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: caseAccount, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteCaseAccountEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, caseAccount]) => {
          return this.data.userDeleteCaseAccount({caseAccountId: caseAccount.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateCaseAccountInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.caseAccountService.importCaseAccounts(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
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
