
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, UserCalendar, CalendarType,User,Team,Calendar } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserCalendarFormState {
  errors?: any
  loading?: boolean
  item?: UserCalendar,
 calendarTypes?: CalendarType[],
 users?: User[],
 teams?: Team[],
 calendars?: Calendar[]
  searchTerm?: string
}

@Injectable()
export class WebUserCalendarFormStore extends ComponentStore<UserCalendarFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly calendarTypes$ = this.select((s) => s.calendarTypes)
  readonly users$ = this.select((s) => s.users)
  readonly teams$ = this.select((s) => s.teams)
  readonly calendars$ = this.select((s) => s.calendars)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.calendarTypes$,this.users$,this.teams$,this.calendars$,
    (errors, loading, item, calendarTypes,users,teams,calendars ) => ({
    errors,
    loading,
    item,
calendarTypes,users,teams,calendars
  }),
{debounce: true})



  readonly filterCalendarTypes = (term) => 
        this.data.userCalendarTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let calendarTypes = res.data.items;
              return calendarTypes
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


  readonly filterUsers = (term) => 
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              return users
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


  readonly filterTeams = (term) => 
        this.data.userTeams({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let teams = res.data.items;
              return teams
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


  readonly filterCalendars = (term) => 
        this.data.userCalendars({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let calendars = res.data.items;
              return calendars
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


}
