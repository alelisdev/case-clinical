
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Appointment, UserCreateAppointmentInput, Location,Patient,LegalCase,AppointmentStatus, VisitKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AppointmentFormState {
  errors?: any
  loading?: boolean
  item?: Appointment,
 locations?: Location[],
 patients?: Patient[],
 legalCases?: LegalCase[],
 appointmentStatuses?: AppointmentStatus[]
 visitKinds?: VisitKind[]

  searchTerm?: string
}

@Injectable()
export class WebAppointmentFormStore extends ComponentStore<AppointmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly locations$ = this.select((s) => s.locations || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly appointmentStatuses$ = this.select((s) => s.appointmentStatuses || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.locations$,this.patients$,this.legalCases$,this.appointmentStatuses$, this.visitKinds$,
    (errors, loading, item, locations,patients,legalCases,appointmentStatuses,visitKinds ) => ({
    errors,
    loading,
    item,
locations,patients,legalCases,appointmentStatuses,visitKinds
  }),
{debounce: true})



  readonly filterLocations = (term) => 
        this.data.userSelectLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let locations = res.data.items;
              this.patchState({locations})
              return locations
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


  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
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


  readonly filterAppointmentStatuses = (term) => 
        this.data.userSelectAppointmentStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let appointmentStatuses = res.data.items;
              this.patchState({appointmentStatuses})
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

  readonly filterVisitKinds = (term) => 
        this.data.userSelectVisitKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let visitKinds = res.data.items;
              this.patchState({visitKinds})
              return visitKinds
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


  readonly addLocation = this.updater((state, location: Location) => ({
    ...state, locations: state.locations.concat(location)
  }))


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addAppointmentStatus = this.updater((state, appointmentStatus: AppointmentStatus) => ({
    ...state, appointmentStatuses: state.appointmentStatuses.concat(appointmentStatus)
  }))

  readonly addVisitKind = this.updater((state, visitKind: VisitKind) => ({
    ...state, visitKinds: state.visitKinds.concat(visitKind)
  }))

}
