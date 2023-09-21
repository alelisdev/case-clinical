
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateLegalCaseInput, WebCoreDataAccessService, LegalCase, AccidentType,Patient,MedLevel,Firm,Attorney,User,CaseStatus,CaseType,PatientTreatmentStatus,CaseProgressStatus,AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { LegalCaseService } from '@case-clinical/web/legal-case/shared'
import { Ng7DynamicBreadcrumbService } from '@case-clinical/web/ui/breadcrumbs'

export interface LegalCaseEditState {
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
export class WebLegalCaseEditStore extends ComponentStore<LegalCaseEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly breadcrumbService: Ng7DynamicBreadcrumbService,

    private readonly legalCaseService: LegalCaseService
) {
    super({ loading: false })
    
    this.loadLegalCaseEffect(route.params.pipe(map((route) => route?.legalCaseId)))
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

  
  readonly loadLegalCaseEffect = this.effect<string>((legalCaseId$) =>
     legalCaseId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((legalCaseId) =>
        this.data.userLegalCase({legalCaseId}).pipe(
          tapResponse(
            (res) => {
              this.breadcrumbService.updateBreadcrumb([
                {
                  name: 'Legal Cases',
                  path: '/queues/legal-cases',
                },
                {
                  name: res.data.item.name,
                  path: `/queues/legal-cases/${res.data?.item?.id}/details/overview`,
                },
                {
                  name: 'Edit',
                  path: `/queues/legal-cases/${res.data.item.id}/details/edit`,
                },
              ])
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

  readonly updateLegalCaseEffect = this.effect<UserUpdateLegalCaseInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.legalCaseService.updateLegalCase(input, item?.id).pipe(
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
