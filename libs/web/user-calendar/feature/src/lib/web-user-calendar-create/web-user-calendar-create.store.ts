
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateUserCalendarInput, WebCoreDataAccessService, UserCalendar, CalendarType,User,Calendar } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserCalendarCreateState {
  errors?: any
  loading?: boolean
  item?: UserCalendar,
 calendarTypes?: CalendarType[],
 users?: User[],
 calendars?: Calendar[]
  searchTerm?: string
}

@Injectable()
export class WebUserCalendarCreateStore extends ComponentStore<UserCalendarCreateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute ) {
    super({ loading: false })
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


    

  readonly createUserCalendarEffect = this.effect<UserCreateUserCalendarInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateUserCalendar({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..', res.data?.created?.id], {relativeTo: this.route})
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
