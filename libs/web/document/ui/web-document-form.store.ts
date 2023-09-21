
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Document, Contract,Patient,Prescription,User,PatientStudy,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface DocumentFormState {
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
export class WebDocumentFormStore extends ComponentStore<DocumentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contracts$ = this.select((s) => s.contracts)
  readonly patients$ = this.select((s) => s.patients)
  readonly prescriptions$ = this.select((s) => s.prescriptions)
  readonly users$ = this.select((s) => s.users)
  readonly patientStudies$ = this.select((s) => s.patientStudies)
  readonly procedureVendors$ = this.select((s) => s.procedureVendors)
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
        this.data.userContracts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contracts = res.data.items;
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
        this.data.userPatients({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patients = res.data.items;
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
        this.data.userPrescriptions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let prescriptions = res.data.items;
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
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
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
        this.data.userPatientStudies({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patientStudies = res.data.items;
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
        this.data.userProcedureVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureVendors = res.data.items;
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


}
