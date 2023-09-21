
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePatientInput,
  UserUpdatePatientInput,
  Patient,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PatientFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  patients: Patient[]
}

@Injectable()
export class WebPatientSelectFormStore extends ComponentStore<PatientFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      patients: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly patients$ = this.select((s) => s.patients)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.patients$,
    (errors, loading, patients) => ({
      errors,
      loading,
      patients
    }),
    { debounce: true },
  )

  addNewPatient = this.updater((state, patient: Patient) => ({ patients: [...state.patients, patient] }))

  updatePatient = this.updater((state, patient: Patient) => {
    return {
      ...state,
      patients: state.patients.map((el) => {
        if (el.id === patient.id) {
          return patient
        } else {
          return el
        }
      }),
    }
  })

  readonly createPatientEffect = this.effect<{ input: UserCreatePatientInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePatient({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPatient(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updatePatientEffect = this.effect<{ input: UserUpdatePatientInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePatient({ patientId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePatient(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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

  loadPatientsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPatients({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                patients: data.data.items,
              })
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )
}

