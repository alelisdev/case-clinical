
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, LegalCase, AccidentType,Patient,Firm,Attorney,User,CaseStatus,CaseType,PatientTreatmentStatus,CaseProgressStatus,AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface LegalCaseFormState {
  errors?: any
  loading?: boolean
  item?: LegalCase,
 accidentTypes?: AccidentType[],
 patients?: Patient[],
 firms?: Firm[],
 attorneys?: Attorney[],
 users?: User[],
 caseStatuses?: CaseStatus[],
 caseTypes?: CaseType[],
 patientTreatmentStatuses?: PatientTreatmentStatus[],
 caseProgressStatuses?: CaseProgressStatus[],
 adverseInsuranceStatuses?: AdverseInsuranceStatus[]
  searchTerm?: string
}

@Injectable()
export class WebLegalCaseFormStore extends ComponentStore<LegalCaseFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes)
  readonly patients$ = this.select((s) => s.patients)
  readonly firms$ = this.select((s) => s.firms)
  readonly attorneys$ = this.select((s) => s.attorneys)
  readonly users$ = this.select((s) => s.users)
  readonly caseStatuses$ = this.select((s) => s.caseStatuses)
  readonly caseTypes$ = this.select((s) => s.caseTypes)
  readonly patientTreatmentStatuses$ = this.select((s) => s.patientTreatmentStatuses)
  readonly caseProgressStatuses$ = this.select((s) => s.caseProgressStatuses)
  readonly adverseInsuranceStatuses$ = this.select((s) => s.adverseInsuranceStatuses)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.accidentTypes$,this.patients$,this.firms$,this.attorneys$,this.users$,this.caseStatuses$,this.caseTypes$,this.patientTreatmentStatuses$,this.caseProgressStatuses$,this.adverseInsuranceStatuses$,
    (errors, loading, item, accidentTypes,patients,firms,attorneys,users,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses ) => ({
    errors,
    loading,
    item,
accidentTypes,patients,firms,attorneys,users,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses
  }),
{debounce: true})



  readonly filterAccidentTypes = (term) => 
        this.data.userAccidentTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let accidentTypes = res.data.items;
              return accidentTypes
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


  readonly filterFirms = (term) => 
        this.data.userFirms({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firms = res.data.items;
              return firms
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


  readonly filterAttorneys = (term) => 
        this.data.userAttorneys({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneys = res.data.items;
              return attorneys
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


  readonly filterCaseStatuses = (term) => 
        this.data.userCaseStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseStatuses = res.data.items;
              return caseStatuses
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


  readonly filterCaseTypes = (term) => 
        this.data.userCaseTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseTypes = res.data.items;
              return caseTypes
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


  readonly filterPatientTreatmentStatuses = (term) => 
        this.data.userPatientTreatmentStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patientTreatmentStatuses = res.data.items;
              return patientTreatmentStatuses
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


  readonly filterCaseProgressStatuses = (term) => 
        this.data.userCaseProgressStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseProgressStatuses = res.data.items;
              return caseProgressStatuses
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


  readonly filterAdverseInsuranceStatuses = (term) => 
        this.data.userAdverseInsuranceStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let adverseInsuranceStatuses = res.data.items;
              return adverseInsuranceStatuses
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
