
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateCalendarWeekdayInput, WebCoreDataAccessService, CalendarWeekday,  } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface CalendarWeekdayUpdateState {
  errors ?: any
  loading?: boolean
  item?: CalendarWeekday,

  searchTerm?: string
}

@Injectable()
export class WebCalendarWeekdayEditStore extends ComponentStore<CalendarWeekdayUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadCalendarWeekdayEffect(route.params.pipe(pluck('calendarWeekdayId')))
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




    

readonly loadCalendarWeekdayEffect = this.effect<string>((calendarWeekdayId$) =>
    calendarWeekdayId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((calendarWeekdayId) =>
        this.data.userCalendarWeekday({ calendarWeekdayId }).pipe(
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

  readonly updateCalendarWeekdayEffect = this.effect<UserUpdateCalendarWeekdayInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateCalendarWeekday({ input, calendarWeekdayId: item.id }).pipe(
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

