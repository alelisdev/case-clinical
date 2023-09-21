
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePrescriptionInput,
  UserUpdatePrescriptionInput,
  Prescription,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PrescriptionFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  prescriptions: Prescription[]
}

@Injectable()
export class WebPrescriptionSelectFormStore extends ComponentStore<PrescriptionFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      prescriptions: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly prescriptions$ = this.select((s) => s.prescriptions)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.prescriptions$,
    (errors, loading, prescriptions) => ({
      errors,
      loading,
      prescriptions
    }),
    { debounce: true },
  )

  addNewPrescription = this.updater((state, prescription: Prescription) => ({ prescriptions: [...state.prescriptions, prescription] }))

  updatePrescription = this.updater((state, prescription: Prescription) => {
    return {
      ...state,
      prescriptions: state.prescriptions.map((el) => {
        if (el.id === prescription.id) {
          return prescription
        } else {
          return el
        }
      }),
    }
  })

  readonly createPrescriptionEffect = this.effect<{ input: UserCreatePrescriptionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePrescription({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPrescription(res.data.created)
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

  readonly updatePrescriptionEffect = this.effect<{ input: UserUpdatePrescriptionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePrescription({ prescriptionId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePrescription(res.data.updated)
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

  loadPrescriptionsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPrescriptions({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                prescriptions: data.data.items,
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

