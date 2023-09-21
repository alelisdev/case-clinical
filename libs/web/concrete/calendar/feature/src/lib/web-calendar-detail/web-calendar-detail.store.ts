
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Calendar } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface CalendarDetailState {
  errors ?: any
  loading?: boolean
  item?: Calendar
}

@Injectable()
export class WebCalendarDetailStore extends ComponentStore<CalendarDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadCalendarEffect(route.params.pipe(pluck('calendarId')))
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
{ label: 'Color', value: item?.color },
{ label: 'Visible', value: item?.visible },
{ label: 'User Calendars', value: item?.userCalendars },
{ label: 'Appointments', value: item?.appointments },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    { label: 'User Calendar', path: 'user-calendar', data: item?.userCalendars },
{ label: 'Appointment', path: 'appointment', data: item?.appointments }
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadCalendarEffect = this.effect<string>((calendarId$) =>
    calendarId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((calendarId) =>
        this.data.userCalendar({ calendarId }).pipe(
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

  readonly deleteCalendarEffect = this.effect<Calendar>(
    (calendar$) =>
      calendar$.pipe(
        switchMap((calendar) =>
          this.data
            .userDeleteCalendar({
              calendarId: calendar.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/calendars']),
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

