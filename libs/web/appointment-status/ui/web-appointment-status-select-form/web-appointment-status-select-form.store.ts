
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAppointmentStatusInput,
  UserUpdateAppointmentStatusInput,
  AppointmentStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AppointmentStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  appointmentStatuses: AppointmentStatus[]
}

@Injectable()
export class WebAppointmentStatusSelectFormStore extends ComponentStore<AppointmentStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      appointmentStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly appointmentStatuses$ = this.select((s) => s.appointmentStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.appointmentStatuses$,
    (errors, loading, appointmentStatuses) => ({
      errors,
      loading,
      appointmentStatuses
    }),
    { debounce: true },
  )

  addNewAppointmentStatus = this.updater((state, appointmentStatus: AppointmentStatus) => ({ appointmentStatuses: [...state.appointmentStatuses, appointmentStatus] }))

  updateAppointmentStatus = this.updater((state, appointmentStatus: AppointmentStatus) => {
    return {
      ...state,
      appointmentStatuses: state.appointmentStatuses.map((el) => {
        if (el.id === appointmentStatus.id) {
          return appointmentStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createAppointmentStatusEffect = this.effect<{ input: UserCreateAppointmentStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAppointmentStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAppointmentStatus(res.data.created)
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

  readonly updateAppointmentStatusEffect = this.effect<{ input: UserUpdateAppointmentStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAppointmentStatus({ appointmentStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAppointmentStatus(res.data.updated)
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

  loadAppointmentStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAppointmentStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                appointmentStatuses: data.data.items,
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

