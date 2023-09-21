
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContractInput, WebCoreDataAccessService, Contract, Organization,Template,Vendor,ReconciliationPeriodType,CalculationBasisType,Process } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractService } from '@case-clinical/web/contract/shared'

export interface ContractEditState {
  errors?: any
  loading?: boolean
  item?: Contract,
 organizations?: Organization[],
 templates?: Template[],
 vendors?: Vendor[],
 reconciliationPeriodTypes?: ReconciliationPeriodType[],
 calculationBasisTypes?: CalculationBasisType[],
 processes?: Process[]
  searchTerm?: string
}

@Injectable()
export class WebContractEditStore extends ComponentStore<ContractEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractService: ContractService
) {
    super({ loading: false })
    
    this.loadContractEffect(route.params.pipe(map((route) => route?.contractId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly organizations$ = this.select((s) => s.organizations || [])
  readonly templates$ = this.select((s) => s.templates || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly reconciliationPeriodTypes$ = this.select((s) => s.reconciliationPeriodTypes || [])
  readonly calculationBasisTypes$ = this.select((s) => s.calculationBasisTypes || [])
  readonly processes$ = this.select((s) => s.processes || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.organizations$,this.templates$,this.vendors$,this.reconciliationPeriodTypes$,this.calculationBasisTypes$,this.processes$,
    (errors, loading, item, organizations,templates,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes ) => ({
    errors,
    loading,
    item,
organizations,templates,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes
  }),
{debounce: true})



  readonly filterOrganizations = (term) => 
        this.data.userSelectOrganizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let organizations = res.data.items;
              this.patchState({organizations})
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
        this.data.userSelectTemplates({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let templates = res.data.items;
              this.patchState({templates})
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


  readonly filterReconciliationPeriodTypes = (term) => 
        this.data.userSelectReconciliationPeriodTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let reconciliationPeriodTypes = res.data.items;
              this.patchState({reconciliationPeriodTypes})
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
        this.data.userSelectCalculationBasisTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let calculationBasisTypes = res.data.items;
              this.patchState({calculationBasisTypes})
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
        this.data.userSelectProcesses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let processes = res.data.items;
              this.patchState({processes})
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

  
  readonly loadContractEffect = this.effect<string>((contractId$) =>
     contractId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contractId) =>
        this.data.userContract({contractId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
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
         this.contractService.updateContract(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
