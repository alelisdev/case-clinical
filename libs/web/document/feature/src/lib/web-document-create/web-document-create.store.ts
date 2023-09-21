
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateDocumentInput, WebCoreDataAccessService, Document, Contract,Patient,Prescription,User,PatientStudy,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { DocumentService } from '../document.service'

export interface DocumentCreateState {
  errors?: any
  loading?: boolean
  item?: Document,
 contracts?: Contract[],
 patients?: Patient[],
 prescriptions?: Prescription[],
 users?: User[],
 patientStudies?: PatientStudy[],
 procedureVendors?: ProcedureVendor[]
  searchTerm?: string
}

@Injectable()
export class WebDocumentCreateStore extends ComponentStore<DocumentCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly documentService: DocumentService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly prescriptions$ = this.select((s) => s.prescriptions || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly patientStudies$ = this.select((s) => s.patientStudies || [])
  readonly procedureVendors$ = this.select((s) => s.procedureVendors || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contracts$,this.patients$,this.prescriptions$,this.users$,this.patientStudies$,this.procedureVendors$,
    (errors, loading, item, contracts,patients,prescriptions,users,patientStudies,procedureVendors ) => ({
    errors,
    loading,
    item,
contracts,patients,prescriptions,users,patientStudies,procedureVendors
  }),
{debounce: true})



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


  readonly filterPatients = (term) => 
        this.data.userSelectPatients({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patients = res.data.items;
              this.patchState({patients})
              return patients
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


  readonly filterPrescriptions = (term) => 
        this.data.userSelectPrescriptions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let prescriptions = res.data.items;
              this.patchState({prescriptions})
              return prescriptions
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


  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
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


  readonly filterPatientStudies = (term) => 
        this.data.userSelectPatientStudies({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patientStudies = res.data.items;
              this.patchState({patientStudies})
              return patientStudies
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



  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))


  readonly addPrescription = this.updater((state, prescription: Prescription) => ({
    ...state, prescriptions: state.prescriptions.concat(prescription)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))


  readonly addPatientStudy = this.updater((state, patientStudy: PatientStudy) => ({
    ...state, patientStudies: state.patientStudies.concat(patientStudy)
  }))


  readonly addProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => ({
    ...state, procedureVendors: state.procedureVendors.concat(procedureVendor)
  }))

    

  readonly createDocumentEffect = this.effect<UserCreateDocumentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.documentService.createDocument(input).pipe(
          tapResponse(
            (document: Document) => {
              this.patchState({ item: document, loading: false })
              return this.router.navigate(['..', document?.id], {relativeTo: this.route})
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
