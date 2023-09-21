
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateAppointmentInput, WebCoreDataAccessService, Appointment, AppointmentStatus,Patient,LegalCase } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface AppointmentUpdateState {
  errors ?: any
  loading?: boolean
  item?: Appointment,
 appointmentStatuses?: AppointmentStatus[],
 patients?: Patient[],
 legalCases?: LegalCase[]
  searchTerm?: string
}

@Injectable()
export class AppointmentEditStore extends ComponentStore<AppointmentUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadAppointmentEffect(route.params.pipe(pluck('appointmentId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly appointmentStatuses$ = this.select((s) => s.appointmentStatuses)
  readonly patients$ = this.select((s) => s.patients)
  readonly legalCases$ = this.select((s) => s.legalCases)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.appointmentStatuses$,this.patients$,this.legalCases$,
    (errors, loading, item, appointmentStatuses,patients,legalCases ) => ({
    errors,
    loading,
    item,
appointmentStatuses,patients,legalCases
  }))



  readonly filterAppointmentStatuses = (term) => 
        this.data.userAppointmentStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let appointmentStatuses = res.data.items;
              return appointmentStatuses
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


  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              return legalCases
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


    

readonly loadAppointmentEffect = this.effect<string>((appointmentId$) =>
    appointmentId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((appointmentId) =>
        this.data.userAppointment({ appointmentId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly updateAppointmentEffect = this.effect<UserUpdateAppointmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateAppointment({ input, appointmentId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['/web/appointments', res.data?.updated?.id])
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
}


