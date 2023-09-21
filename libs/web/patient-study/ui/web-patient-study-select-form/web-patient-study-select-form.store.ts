
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePatientStudyInput,
  UserUpdatePatientStudyInput,
  PatientStudy,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PatientStudyFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  patientStudies: PatientStudy[]
}

@Injectable()
export class WebPatientStudySelectFormStore extends ComponentStore<PatientStudyFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      patientStudies: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly patientStudies$ = this.select((s) => s.patientStudies)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.patientStudies$,
    (errors, loading, patientStudies) => ({
      errors,
      loading,
      patientStudies
    }),
    { debounce: true },
  )

  addNewPatientStudy = this.updater((state, patientStudy: PatientStudy) => ({ patientStudies: [...state.patientStudies, patientStudy] }))

  updatePatientStudy = this.updater((state, patientStudy: PatientStudy) => {
    return {
      ...state,
      patientStudies: state.patientStudies.map((el) => {
        if (el.id === patientStudy.id) {
          return patientStudy
        } else {
          return el
        }
      }),
    }
  })

  readonly createPatientStudyEffect = this.effect<{ input: UserCreatePatientStudyInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePatientStudy({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPatientStudy(res.data.created)
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

  readonly updatePatientStudyEffect = this.effect<{ input: UserUpdatePatientStudyInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePatientStudy({ patientStudyId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePatientStudy(res.data.updated)
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

  loadPatientStudiesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPatientStudies({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                patientStudies: data.data.items,
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

