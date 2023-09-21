import { Component } from '@angular/core'
import { Appointment, Calendar, UserCreateAppointmentInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { EventInput, EventSourceInput } from '@fullcalendar/core'
import { Subject, timer } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import { WebFullCalendarFeatureStore } from './web-full-calendar-feature.store'
import { of } from 'zen-observable'
import moment from 'moment'

@Component({
  template: `
    <ui-page >
      <div class="dark:bg-gray-800 px-6 py-4 mb-3 md:mb-6">
          <ng-container *ngIf="settings$ | async as fetchSettings; else elseBlok">
            <ui-calendar
              [fetchEvent]="fetchEvent"
              [calendars]="getCalendars"
              [fetchSettings]="fetchSettings"
              [weekdays]="weekdays"
              (addEventInServserSide)="this.addEventInServserSide($event)"
              (removeEventInServserSide)="this.removeEventInServserSide($event)"
              (updateEventInServserSide)="this.updateEventInServserSide($event)"
              (addCalendarInServserSide)="this.addCalendarInServserSide($event)"
              (updateCalendarInServserSide)="this.updateCalendarInServserSide($event)"
              (updateCalendarVisibleInServserSide)="this.updateCalendarVisibleInServserSide($event)"
              (deleteCalendarInServserSide)="this.deleteCalendarInServserSide($event)"
              (settingsUpdateCalendarInServserSide)="this.settingsUpdateCalendarInServserSide($event)"
            ></ui-calendar>
          </ng-container>
      </div>
      <ng-template #elseBlok><p>Loading...</p></ng-template>
    </ui-page>
  `,
})
export class WebFullCalendarFeatureComponent {
  fetchEvent: any
  getCalendars: any
  calendarItems: any[] = []
  settings$: any
  calenders: any
  weekdays: any
  EventSourceObject$ = []
  private timeSubject = new Subject<any>()
  eventSourceObject: any[] = []

  constructor(private readonly CalendarService: WebCoreDataAccessService) {}

  ngOnInit(): void {
    this.getEventInServserSide()
    this.getCalendarInServserSide()
    this.settingsCalendarInServserSide()
    this.getadminCalendarWeekdays()
  }

  // Api call get event in server side
  getEventInServserSide(): void {

    // .subscribe((res) => {
    //   timer(1000)
    //     .pipe(takeUntil(this.timeSubject))
    //     .subscribe((data) => {
    //       this.fetchEvent = res
    //     })

    this.CalendarService.accountProfile({}, { fetchPolicy: 'no-cache' }).subscribe(() => {
      this.CalendarService.userUserCalendars({},{ fetchPolicy: 'no-cache' }).subscribe((userCalendars) => {
        userCalendars.data.items.forEach((calendarId) => {
          this.CalendarService.userCalendar({ calendarId: calendarId.calendarId },{ fetchPolicy: 'no-cache' }).subscribe((calendar) => {
            this.eventSourceObject = []
            
            console.log(calendar.data.item.appointments)
            
            let events_filtered = calendar.data.item.appointments
                    .map((res:Appointment) => {

                          // Date formate
                      res.start = moment(res.start).format()
                      res.end = moment(res.end).format()
                      res.duration = moment(res.end).diff(moment(res.start), 'minutes')

                      if (res?.recurrence === null) {
                        return res
                      }

                      if (!res?.recurrence?.includes('FREQ')) {
                        return { ...res, recurrence: null }
                      }

                      return { ...res, rrule: res?.recurrence }
                    })


                  let calendarInstance = <Calendar>calendar
                  console.log(events_filtered)

                  let EventSourceObject: EventInput = {
                    id: calendar?.data?.item?.id,
                    title: calendarInstance?.title,
                    events: events_filtered,
                    color: calendar.data?.item?.color,
                    display: calendar.data?.item?.visible ? 'block' : 'none',
                  }
                  this.eventSourceObject.push(EventSourceObject)
                  this.fetchEvent = this.eventSourceObject
                  return this.eventSourceObject
          })
        })
      })
    })
  }

  // Api call add event in server side
  addEventInServserSide(source: any): void {
    console.log(source)

    const { 
      allDay, 
      calendarId,
       description,
      duration,
      end,
      recurrence,
      recurringEventId,
      start,
    } = source?.input
    var name = source?.input?.title
      
    this.CalendarService.userCreateAppointment({input: { 
      allDay, 
      //calendarId,
      description,
     duration,
     end,
     recurrence,
     recurringEventId,
     start,
     name,
   }}).subscribe((res) => console.log('created',res))

   this.getEventInServserSide()
  }

  // Api call delete event in server side
  removeEventInServserSide(input): void {
    this.CalendarService.userDeleteAppointment({ appointmentId: input }).subscribe((res) => res)
    this.getEventInServserSide()
  }

  // Api call update event in server side
  updateEventInServserSide(input): void {
    this.CalendarService.userUpdateAppointment(input).subscribe((res) => res)
    this.getEventInServserSide()
  }

  // Api call get calendar in server side
  getCalendarInServserSide(): void {
    this.CalendarService.accountProfile({}, { fetchPolicy: 'no-cache' }).subscribe((user) => {
      this.CalendarService.userUserCalendars({}, { fetchPolicy: 'no-cache' }).subscribe((userCalendars) => {
        this.calendarItems = []
        userCalendars.data.items.forEach((calendarId) => {
          console.log('calendars', calendarId)
          this.CalendarService.userCalendar({ calendarId: calendarId.calendarId }, { fetchPolicy: 'no-cache' }).subscribe((calendar) => {
            this.calendarItems.push(calendar.data.item)
            this.getCalendars = this.calendarItems
          })
        })
      })
    })
  }

  // Api call add calendar in server side
  addCalendarInServserSide(input): void {
    this.CalendarService.accountProfile({}, { fetchPolicy: 'no-cache' }).subscribe((user) => {
      this.CalendarService.userCreateCalendar(input).subscribe((calendar) => {
        const input = {
          userId: user.data.accountProfile.id,
          name: user.data.accountProfile.firstName + ' ' +user.data.accountProfile.lastName,
          calendarId: calendar.data.created.id,
        }
        this.CalendarService.userCreateUserCalendar({ input }).subscribe((res) => {
          this.getCalendarInServserSide()
          this.getEventInServserSide()
        })
      })
    })
  }
  // Api call update calendar in server side
  updateCalendarInServserSide(input): void {
    this.CalendarService.userUpdateCalendar(input).subscribe((res) => res)
    this.getCalendarInServserSide()
    this.getEventInServserSide()
  }

  updateCalendarVisibleInServserSide(input): void {
    this.CalendarService.userUpdateCalendar(input).subscribe((res) => res)
    this.getEventInServserSide()
  }

  // Api call delete calendar in server side
  deleteCalendarInServserSide(input): void {
    this.CalendarService.userUserCalendars().subscribe((userCalendars) => {
      const { id } = userCalendars.data.items.find((userCalendarId) => userCalendarId.calendarId === input.calendarId)
      this.CalendarService.userDeleteUserCalendar({ userCalendarId: id }).subscribe((res) => {
        this.CalendarService.userDeleteCalendar(input).subscribe((calendar) => {
          this.getCalendarInServserSide()
          this.getEventInServserSide()
        })
      })
    })
  }

  // Api call calendar settings
  settingsUpdateCalendarInServserSide(input): void {
    this.CalendarService.userUpdateSetting(input).subscribe((res) => res)
    this.settingsCalendarInServserSide()
  }

  // Api call calendar settings
  settingsCalendarInServserSide(): void {
    this.settings$ = this.CalendarService.userSettings().pipe(map((res) => res.data.items))
  }

  // Api call calendar Weekdays
  getadminCalendarWeekdays(): void {
    // TODO:  this.CalendarService.userCalendarWeekdays().subscribe((res) => (this.weekdays = res.data.items))
  }
}
