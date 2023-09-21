
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, LegalCase, UserCreateLegalCaseInput, AccidentType,Patient,MedLevel,Firm,Attorney,User,CaseStatus,CaseType,PatientTreatmentStatus,CaseProgressStatus,AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface LegalCaseFormState {
  errors?: any
  loading?: boolean
  item?: LegalCase,
 accidentTypes?: AccidentType[],
 patients?: Patient[],
 medLevels?: MedLevel[],
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
  readonly accidentTypes$ = this.select((s) => s.accidentTypes || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly medLevels$ = this.select((s) => s.medLevels || [])
  readonly firms$ = this.select((s) => s.firms || [])
  readonly attorneys$ = this.select((s) => s.attorneys || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly caseStatuses$ = this.select((s) => s.caseStatuses || [])
  readonly caseTypes$ = this.select((s) => s.caseTypes || [])
  readonly patientTreatmentStatuses$ = this.select((s) => s.patientTreatmentStatuses || [])
  readonly caseProgressStatuses$ = this.select((s) => s.caseProgressStatuses || [])
  readonly adverseInsuranceStatuses$ = this.select((s) => s.adverseInsuranceStatuses || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.accidentTypes$,this.patients$,this.medLevels$,this.firms$,this.attorneys$,this.users$,this.caseStatuses$,this.caseTypes$,this.patientTreatmentStatuses$,this.caseProgressStatuses$,this.adverseInsuranceStatuses$,
    (errors, loading, item, accidentTypes,patients,medLevels,firms,attorneys,users,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses ) => ({
    errors,
    loading,
    item,
accidentTypes,patients,medLevels,firms,attorneys,users,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses
  }),
{debounce: true})



  readonly filterAccidentTypes = (term) => 
        this.data.userSelectAccidentTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let accidentTypes = res.data.items;
              this.patchState({accidentTypes})
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


  readonly filterMedLevels = (term) => 
        this.data.userSelectMedLevels({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let medLevels = res.data.items;
              this.patchState({medLevels})
              return medLevels
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
        this.data.userSelectFirms({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firms = res.data.items;
              this.patchState({firms})
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
        this.data.userSelectAttorneys({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneys = res.data.items;
              this.patchState({attorneys})
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


  readonly filterCaseStatuses = (term) => 
        this.data.userSelectCaseStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseStatuses = res.data.items;
              this.patchState({caseStatuses})
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
        this.data.userSelectCaseTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseTypes = res.data.items;
              this.patchState({caseTypes})
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
        this.data.userSelectPatientTreatmentStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patientTreatmentStatuses = res.data.items;
              this.patchState({patientTreatmentStatuses})
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
        this.data.userSelectCaseProgressStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseProgressStatuses = res.data.items;
              this.patchState({caseProgressStatuses})
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
        this.data.userSelectAdverseInsuranceStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let adverseInsuranceStatuses = res.data.items;
              this.patchState({adverseInsuranceStatuses})
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



  readonly createLegalCaseEffect = this.effect<UserCreateLegalCaseInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateLegalCase({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addAccidentType = this.updater((state, accidentType: AccidentType) => ({
    ...state, accidentTypes: state.accidentTypes.concat(accidentType)
  }))


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))


  readonly addMedLevel = this.updater((state, medLevel: MedLevel) => ({
    ...state, medLevels: state.medLevels.concat(medLevel)
  }))


  readonly addFirm = this.updater((state, firm: Firm) => ({
    ...state, firms: state.firms.concat(firm)
  }))


  readonly addAttorney = this.updater((state, attorney: Attorney) => ({
    ...state, attorneys: state.attorneys.concat(attorney)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))


  readonly addCaseStatus = this.updater((state, caseStatus: CaseStatus) => ({
    ...state, caseStatuses: state.caseStatuses.concat(caseStatus)
  }))


  readonly addCaseType = this.updater((state, caseType: CaseType) => ({
    ...state, caseTypes: state.caseTypes.concat(caseType)
  }))


  readonly addPatientTreatmentStatus = this.updater((state, patientTreatmentStatus: PatientTreatmentStatus) => ({
    ...state, patientTreatmentStatuses: state.patientTreatmentStatuses.concat(patientTreatmentStatus)
  }))


  readonly addCaseProgressStatus = this.updater((state, caseProgressStatus: CaseProgressStatus) => ({
    ...state, caseProgressStatuses: state.caseProgressStatuses.concat(caseProgressStatus)
  }))


  readonly addAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus: AdverseInsuranceStatus) => ({
    ...state, adverseInsuranceStatuses: state.adverseInsuranceStatuses.concat(adverseInsuranceStatus)
  }))

}
