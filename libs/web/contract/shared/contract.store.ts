
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContractService } from './contract.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContractInput, UserUpdateContractInput, WebCoreDataAccessService, CorePaging, Contract, Organization, Template, Vendor, ReconciliationPeriodType, CalculationBasisType, Process } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContractFeatureState {
  errors?: any
  loading?: boolean
  item?: Contract
  done: boolean,
  formName?: string
  organizationId?: string, billingOrganizationId?: string, templateId?: string, vendorId?: string, reconciliationPeriodTypeId?: string, calculationBasisTypeId?: string, processId?: string,
  contracts: Contract[]
  organizations?: Organization[],
  templates?: Template[],
  vendors?: Vendor[],
  reconciliationPeriodTypes?: ReconciliationPeriodType[],
  calculationBasisTypes?: CalculationBasisType[],
  processes?: Process[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContractFeatureStore extends ComponentStore<ContractFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractService: ContractService
  ) {
    super({
      loading: false,
      contracts: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      organizationId: undefined,
      billingOrganizationId: undefined,
      templateId: undefined,
      vendorId: undefined,
      reconciliationPeriodTypeId: undefined,
      calculationBasisTypeId: undefined,
      processId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contractId')) {
      const contractId = this.route.snapshot.paramMap.get('contractId')
      this.setFormName('contract_edit')
    } else {
      this.setFormName('contract_create')
    }


    if (this.route.snapshot.paramMap.has("organizationId")) {
      const organizationId = this.route.snapshot.paramMap.get("organizationId")
      this.setOrganizationId(organizationId)
    }


    if (this.route.snapshot.paramMap.has("billingOrganizationId")) {
      const billingOrganizationId = this.route.snapshot.paramMap.get("billingOrganizationId")
      this.setBillingOrganizationId(billingOrganizationId)
    }


    if (this.route.snapshot.paramMap.has("templateId")) {
      const templateId = this.route.snapshot.paramMap.get("templateId")
      this.setTemplateId(templateId)
    }


    if (this.route.snapshot.paramMap.has("vendorId")) {
      const vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }


    if (this.route.snapshot.paramMap.has("reconciliationPeriodTypeId")) {
      const reconciliationPeriodTypeId = this.route.snapshot.paramMap.get("reconciliationPeriodTypeId")
      this.setReconciliationPeriodTypeId(reconciliationPeriodTypeId)
    }


    if (this.route.snapshot.paramMap.has("calculationBasisTypeId")) {
      const calculationBasisTypeId = this.route.snapshot.paramMap.get("calculationBasisTypeId")
      this.setCalculationBasisTypeId(calculationBasisTypeId)
    }


    if (this.route.snapshot.paramMap.has("processId")) {
      const processId = this.route.snapshot.paramMap.get("processId")
      this.setProcessId(processId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contracts$ = this.select((s) => s.contracts)
  readonly organizations$ = this.select((s) => s.organizations || [])
  readonly templates$ = this.select((s) => s.templates || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly reconciliationPeriodTypes$ = this.select((s) => s.reconciliationPeriodTypes || [])
  readonly calculationBasisTypes$ = this.select((s) => s.calculationBasisTypes || [])
  readonly processes$ = this.select((s) => s.processes || [])

  readonly organizationId$ = this.select((s) => s.organizationId)

  readonly billingOrganizationId$ = this.select((s) => s.billingOrganizationId)

  readonly templateId$ = this.select((s) => s.templateId)

  readonly vendorId$ = this.select((s) => s.vendorId)

  readonly reconciliationPeriodTypeId$ = this.select((s) => s.reconciliationPeriodTypeId)

  readonly calculationBasisTypeId$ = this.select((s) => s.calculationBasisTypeId)

  readonly processId$ = this.select((s) => s.processId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done) => ({
      item, done,
    }),
    { debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contracts$,
    this.organizations$, this.templates$, this.vendors$, this.reconciliationPeriodTypes$, this.calculationBasisTypes$, this.processes$,
    (errors, loading, item, formName, contracts, organizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes) => ({
      errors,
      loading,
      item,
      formName,
      contracts,

      organizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes
    }),
    { debounce: true })

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
      processId, searchQuery) => ({
        limit: paging.limit,
        skip: paging.skip,
        name: searchQuery,
        organizationId: organizationId, billingOrganizationId: billingOrganizationId, templateId: templateId, vendorId: vendorId, reconciliationPeriodTypeId: reconciliationPeriodTypeId, calculationBasisTypeId: calculationBasisTypeId, processId: processId,
        total: paging.total
      }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
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



  readonly filterOrganizations = (term) =>
    this.data.userSelectOrganizations({ input: { name: term, limit: 1000 } }).pipe(
      tapResponse(
        (res: any) => {
          const organizations = res.data.items;
          this.patchState({ organizations })
          return organizations
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


  readonly filterTemplates = (term) =>
    this.data.userSelectTemplates({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const templates = res.data.items;
          this.patchState({ templates })
          return templates
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
    this.data.userSelectVendors({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const vendors = res.data.items;
          this.patchState({ vendors })
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


  readonly filterReconciliationPeriodTypes = (term) =>
    this.data.userSelectReconciliationPeriodTypes({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const reconciliationPeriodTypes = res.data.items;
          this.patchState({ reconciliationPeriodTypes })
          return reconciliationPeriodTypes
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


  readonly filterCalculationBasisTypes = (term) =>
    this.data.userSelectCalculationBasisTypes({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const calculationBasisTypes = res.data.items;
          this.patchState({ calculationBasisTypes })
          return calculationBasisTypes
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


  readonly filterProcesses = (term) =>
    this.data.userSelectProcesses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const processes = res.data.items;
          this.patchState({ processes })
          return processes
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



  readonly addOrganization = this.updater((state, organization: Organization) => ({
    ...state, organizations: state.organizations.concat(organization)
  }))


  readonly addTemplate = this.updater((state, template: Template) => ({
    ...state, templates: state.templates.concat(template)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))


  readonly addReconciliationPeriodType = this.updater((state, reconciliationPeriodType: ReconciliationPeriodType) => ({
    ...state, reconciliationPeriodTypes: state.reconciliationPeriodTypes.concat(reconciliationPeriodType)
  }))


  readonly addCalculationBasisType = this.updater((state, calculationBasisType: CalculationBasisType) => ({
    ...state, calculationBasisTypes: state.calculationBasisTypes.concat(calculationBasisType)
  }))


  readonly addProcess = this.updater((state, process: Process) => ({
    ...state, processes: state.processes.concat(process)
  }))



  readonly setItem = this.updater((state, item: Contract) => ({ ...state, item }))

  addNewContract = this.updater((state, contract: Contract) => ({ ...state, contracts: [...state.contracts, contract] }))

  updateContract = this.updater((state, contract: Contract) => {
    return {
      ...state,
      contracts: state.contracts.map((el) => {
        if (el.id === contract.id) {
          return contract
        } else {
          return el
        }
      }),
    }
  })

  addContracts = this.updater((state, newContracts: any[]) => ({ ...state, contracts: state.contracts.concat(newContracts) }))
  updateContracts = this.updater((state, updatedContracts: any[]) => {
    return {
      ...state,
      contracts: state.contracts.map((contract) => {
        const updated = updatedContracts.find((el) => el.id === contract.id);
        return updated ? updated : contract;
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
        return this.contractService.checkRequiredFields(excelData).pipe(
          switchMap(({ data, badData, requiredFields }) => {
            if (badData?.length > 0) {
              this.toast.error(`${badData.length} rows do not have all required fields. All rows should contain ${requiredFields.join(', ')}`, { duration: 3000 });
            }
            return this.contractService.validateContractExcelData(data, vm.organizations, vm.organizations, vm.templates, vm.vendors, vm.reconciliationPeriodTypes, vm.calculationBasisTypes, vm.processes);
          })
        )
      })
    )
  }

  readonly loadContractEffect = this.effect<string>((contractId$) =>
    contractId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contractId) =>
        this.data.userContract({ contractId }).pipe(
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



  readonly loadContractsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContracts({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                contracts: res.data.items,
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

  readonly createContractEffect = this.effect<UserCreateContractInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.contractService.createContract({ ...input }).pipe(
          tapResponse(
            (contract: Contract) => {
              this.addNewContract(contract)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contract, loading: false, done: true }), 300);
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

  readonly updateContractEffect = this.effect<UserUpdateContractInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.contractService.updateContract(input, input.id).pipe(
          tapResponse(
            (contract) => {
              this.updateContract(contract)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: contract, loading: false, done: true }), 300);
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

  readonly deleteContractEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contract]) => {
          return this.data.userDeleteContract({ contractId: contract.id })
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
            )
        }
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateContractInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) => this.contractService.importContracts(data).pipe(
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

            this.addContracts(created);
            this.updateContracts(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
