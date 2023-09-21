
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAppointmentInput,
  UserUpdateAppointmentInput,
  Appointment,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AppointmentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  appointments: Appointment[]
}

@Injectable()
export class WebAppointmentSelectFormStore extends ComponentStore<AppointmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      appointments: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly appointments$ = this.select((s) => s.appointments)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.appointments$,
    (errors, loading, appointments) => ({
      errors,
      loading,
      appointments
    }),
    { debounce: true },
  )

  addNewAppointment = this.updater((state, appointment: Appointment) => ({ appointments: [...state.appointments, appointment] }))

  updateAppointment = this.updater((state, appointment: Appointment) => {
    return {
      ...state,
      appointments: state.appointments.map((el) => {
        if (el.id === appointment.id) {
          return appointment
        } else {
          return el
        }
      }),
    }
  })

  readonly createAppointmentEffect = this.effect<{ input: UserCreateAppointmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAppointment({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAppointment(res.data.created)
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

  readonly updateAppointmentEffect = this.effect<{ input: UserUpdateAppointmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAppointment({ appointmentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAppointment(res.data.updated)
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

  loadAppointmentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAppointments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                appointments: data.data.items,
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

