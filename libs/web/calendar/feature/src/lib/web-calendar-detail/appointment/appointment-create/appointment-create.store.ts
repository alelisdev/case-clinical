
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserCreateAppointmentInput, WebCoreDataAccessService, Appointment, AppointmentStatus,Patient,LegalCase } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AppointmentCreateState {
  errors?: any
  loading?: boolean
  item?: Appointment,
 appointmentStatuses?: AppointmentStatus[],
 patients?: Patient[],
 legalCases?: LegalCase[]
  searchTerm?: string
}

@Injectable()
export class AppointmentCreateStore extends ComponentStore<AppointmentCreateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private route: ActivatedRoute) {
    super({ loading: false })
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


    

  readonly createAppointmentEffect = this.effect<UserCreateAppointmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateAppointment({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..'], {relativeTo: this.route})
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


