
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Appointment } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface AppointmentDetailState {
  errors ?: any
  loading?: boolean
  item?: Appointment
}

@Injectable()
export class AppointmentDetailStore extends ComponentStore<AppointmentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadAppointmentEffect(route.params.pipe(pluck('appointmentId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
//{f.name}
{ label: 'Appointment Date And Time', value: item?.appointmentDateAndTime },
{ label: 'Location Name', value: item?.locationName },
{ label: 'Line 1', value: item?.line1 },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Postal Code', value: item?.postalCode },
{ label: 'Checked In', value: item?.checkedIn },
{ label: 'Checked In Date Time', value: item?.checkedInDateTime },
{ label: 'Latitude', value: item?.latitude },
{ label: 'Longitude', value: item?.longitude },
{ label: 'Medical Report Url', value: item?.medicalReportUrl },
{ label: 'Bill Url', value: item?.billUrl },
{ label: 'Duration', value: item?.duration },
//{f.name}
{ label: 'Calendars', value: item?.calendars },
//{f.name}
{ label: 'Notes', value: item?.notes },
{ label: 'Recurring Event Number', value: item?.recurringEventNumber },
{ label: 'Is First Instance', value: item?.isFirstInstance },
{ label: 'Description', value: item?.description },
{ label: 'Start', value: item?.start },
{ label: 'End', value: item?.end },
{ label: 'All Day', value: item?.allDay },
{ label: 'Recurrence', value: item?.recurrence },
{ label: 'Tasks', value: item?.tasks },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      url: 'details',
      data: item,
    },
    
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }))
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

  readonly deleteAppointmentEffect = this.effect<Appointment>(
    (appointment$) =>
      appointment$.pipe(
        switchMap((appointment) =>
          this.data
            .userDeleteAppointment({
              appointmentId: appointment.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/appointments']),
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

