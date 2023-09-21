import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Calendar, CorePaging, UserCalendar } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { EventInput, EventSourceInput } from '@fullcalendar/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { Events } from 'ag-grid-community'
import moment from 'moment'

export interface CalendarFeatureState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
  paging?: CorePaging
  loading?: boolean
  data?: UserCalendar[]
  weekdays?: any[]
  calendars?: any[]
  appointments?: EventInput[]
  settings?: any[]
}

@Injectable({
  providedIn: 'root'
})
export class WebFullCalendarFeatureStore extends ComponentStore<CalendarFeatureState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      headerTitle: 'Calendars',
      searchFocused: false,
      searchQuery: '',
      paging: {
        limit: 1000,
        skip: 0,
      },
    })
    this.tempMethod()
  }

  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly data$ = this.select((s) => s.data)
  readonly items$ = this.select(this.data$, this.mapDataToEventSourceInput)
  readonly calendars$ = this.select((s) => s.calendars)
  readonly appointments$ = this.select((s) => s.appointments)
  readonly weekdays$ = this.select((s) => s.weekdays)
  readonly settings$ = this.select((s) => s.settings)

  readonly vm$ = this.select(
    this.settings$,
    this.errors$,
    this.loading$,
    this.calendars$,
    this.appointments$,
    this.weekdays$,
    this.data$,
    this.items$,

    (settings, errors, loading, calendars, appointments, weekdays, data, items) => ({
      settings,
      errors,
      loading,
      calendars,
      appointments,
      weekdays,
      data,
      items,
    }),

  )

  readonly loadUserCalendarsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      tap(() =>
        this.data.userUserCalendars({ }).pipe(
          tapResponse(
            (res) => {
              console.log('UserCalendar Called in store',res)
              return this.patchState({
                paging: res.data.count,
                data: res.data.items,
                calendars: mapCalendars(res.data.items) ,
                errors: res.errors,
                loading: false,
            })},
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

  private tempMethod() {
    this.data.accountProfile({}, { fetchPolicy: 'no-cache' }).subscribe((user) => {
      
      // return user.data.accountProfile.userCalendars.map((calendar: UserCalendar) => {
      //     let events_filtered = calendar.calendar.appointments.map((appointment) => { 
      //     appointment.start = moment(appointment.start).second(0).millisecond(0).toISOString()
      //     appointment.end = moment(appointment.end).second(0).millisecond(0).toISOString()

      //     if (appointment.recurrence === null) {
      //       return appointment
      //     }

      //     if (!appointment.recurrence.includes('FREQ')) {
      //       return { ...appointment, recurrence: null }
      //     }

      //     return { ...appointment, rrule: appointment.recurrence }

      //             // {
      //             //   id: '3be50686-e3a1-4f4b-aa4d-5cb8517ba4e4',
      //             //   calendarId: '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
      //             //   title: 'Portfolio Design',
      //             //   description: '',
      //             //   start: moment().hour(9).minute(0).second(0).millisecond(0).toISOString(), // Today 09:00
      //             //   end: moment().add(1, 'day').hour(14).minute(0).second(0).millisecond(0).toISOString(), // Tomorrow 14:00
      //             //   duration: null,
      //             //   allDay: false,
      //             //   recurrence: null,
      //             // }

      //     })

      //         console.log(events_filtered )

      //         let EventSourceObject = {
      //           id: calendar.calendar.id,
      //           title: calendar.calendar.name,
      //           events: events_filtered,
      //           color: calendar.calendar.color,
      //           display: calendar.calendar.visible ? 'block' : 'none',
      //         }

      //        this.patchState({appointments:[ ...events_filtered ], calendars: [EventSourceObject]})
      //        return events_filtered
      //   })
      })
  }

  private mapDataToEventSourceInput(data: UserCalendar[]) {
    console.log('calendar data',data)
    return (data || []).map(
      ({ name, id, createdAt }) =>
        ({
          title: name,
          path: id,
          leftMeta: {
            icon: 'calendar',
            text: createdAt,
          },
        } as EventInput),
    )
  }
}
function mapCalendars(items: any[]) {
  console.log(items)
  return items
}

