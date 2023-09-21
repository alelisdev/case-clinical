
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PatientStudy, UserCreatePatientStudyInput, Patient } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PatientStudyFormState {
  errors?: any
  loading?: boolean
  item?: PatientStudy,
 patients?: Patient[]
  searchTerm?: string
}

@Injectable()
export class WebPatientStudyFormStore extends ComponentStore<PatientStudyFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly patients$ = this.select((s) => s.patients || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.patients$,
    (errors, loading, item, patients ) => ({
    errors,
    loading,
    item,
patients
  }),
{debounce: true})



  readonly filterPatients = (term) => 
        this.data.userPatients({input: { name: term}}).pipe(
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



  readonly createPatientStudyEffect = this.effect<UserCreatePatientStudyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePatientStudy({ input }).pipe(
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


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))

}
