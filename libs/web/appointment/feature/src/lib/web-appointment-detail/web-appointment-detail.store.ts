
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Appointment } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface AppointmentDetailState {
  errors ?: any
  loading?: boolean
  item?: Appointment
}

@Injectable()
export class WebAppointmentDetailStore extends ComponentStore<AppointmentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
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
{ label: 'Appointment Date and Time', value: item?.appointmentDateAndTime },

{ label: 'Checked in', value: item?.checkedIn },
{ label: 'Checked in Date Time', value: item?.checkedInDateTime },
{ label: 'Medical Report', value: item?.medicalReport },
{ label: 'Bill', value: item?.bill },
{ label: 'Imaging', value: item?.imaging },
{ label: 'Duration', value: item?.duration },




{ label: 'Notes', value: item?.notes },

{ label: 'Is First Instance', value: item?.isFirstInstance },
{ label: 'Description', value: item?.description },
{ label: 'Start', value: item?.start },
{ label: 'End', value: item?.end },
{ label: 'All Day', value: item?.allDay },
{ label: 'Recurrence', value: item?.recurrence },
{ label: 'Final Visit Approved', value: item?.finalVisitApproved  },
{ label: 'Claim Procedures', value: item?.claimProcedures },
{ label: 'Case Procedures', value: item?.caseProcedures },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

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
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/appointments'])
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

