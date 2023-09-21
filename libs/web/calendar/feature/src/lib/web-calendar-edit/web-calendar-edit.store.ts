
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateCalendarInput, WebCoreDataAccessService, Calendar,  } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface CalendarUpdateState {
  errors ?: any
  loading?: boolean
  item?: Calendar,

  searchTerm?: string
}

@Injectable()
export class WebCalendarEditStore extends ComponentStore<CalendarUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadCalendarEffect(route.params.pipe(pluck('calendarId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

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

  readonly updateCalendarEffect = this.effect<UserUpdateCalendarInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateCalendar({ input, calendarId: item.id }).pipe(
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

