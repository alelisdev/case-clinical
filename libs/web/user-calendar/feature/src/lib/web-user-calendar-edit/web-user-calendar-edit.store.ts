
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateUserCalendarInput, WebCoreDataAccessService, UserCalendar, CalendarType,User,Calendar } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface UserCalendarUpdateState {
  errors ?: any
  loading?: boolean
  item?: UserCalendar,
 calendarTypes?: CalendarType[],
 users?: User[],
 calendars?: Calendar[]
  searchTerm?: string
}

@Injectable()
export class WebUserCalendarEditStore extends ComponentStore<UserCalendarUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadUserCalendarEffect(route.params.pipe(pluck('userCalendarId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly calendarTypes$ = this.select((s) => s.calendarTypes)
  readonly users$ = this.select((s) => s.users)
  readonly calendars$ = this.select((s) => s.calendars)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.calendarTypes$,this.users$,this.calendars$,
    (errors, loading, item, calendarTypes,users,calendars ) => ({
    errors,
    loading,
    item,
calendarTypes,users,calendars
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


    

readonly loadUserCalendarEffect = this.effect<string>((userCalendarId$) =>
    userCalendarId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userCalendarId) =>
        this.data.userUserCalendar({ userCalendarId }).pipe(
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

  readonly updateUserCalendarEffect = this.effect<UserUpdateUserCalendarInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateUserCalendar({ input, userCalendarId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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

