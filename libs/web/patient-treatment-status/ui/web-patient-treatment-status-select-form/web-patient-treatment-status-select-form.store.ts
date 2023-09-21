
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePatientTreatmentStatusInput,
  UserUpdatePatientTreatmentStatusInput,
  PatientTreatmentStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PatientTreatmentStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  patientTreatmentStatuses: PatientTreatmentStatus[]
}

@Injectable()
export class WebPatientTreatmentStatusSelectFormStore extends ComponentStore<PatientTreatmentStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      patientTreatmentStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly patientTreatmentStatuses$ = this.select((s) => s.patientTreatmentStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.patientTreatmentStatuses$,
    (errors, loading, patientTreatmentStatuses) => ({
      errors,
      loading,
      patientTreatmentStatuses
    }),
    { debounce: true },
  )

  addNewPatientTreatmentStatus = this.updater((state, patientTreatmentStatus: PatientTreatmentStatus) => ({ patientTreatmentStatuses: [...state.patientTreatmentStatuses, patientTreatmentStatus] }))

  updatePatientTreatmentStatus = this.updater((state, patientTreatmentStatus: PatientTreatmentStatus) => {
    return {
      ...state,
      patientTreatmentStatuses: state.patientTreatmentStatuses.map((el) => {
        if (el.id === patientTreatmentStatus.id) {
          return patientTreatmentStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createPatientTreatmentStatusEffect = this.effect<{ input: UserCreatePatientTreatmentStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePatientTreatmentStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPatientTreatmentStatus(res.data.created)
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

  readonly updatePatientTreatmentStatusEffect = this.effect<{ input: UserUpdatePatientTreatmentStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePatientTreatmentStatus({ patientTreatmentStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePatientTreatmentStatus(res.data.updated)
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

  loadPatientTreatmentStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPatientTreatmentStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                patientTreatmentStatuses: data.data.items,
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

