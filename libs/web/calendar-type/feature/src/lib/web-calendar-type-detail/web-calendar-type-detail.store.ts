
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CalendarType } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface CalendarTypeDetailState {
  errors ?: any
  loading?: boolean
  item?: CalendarType
}

@Injectable()
export class WebCalendarTypeDetailStore extends ComponentStore<CalendarTypeDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadCalendarTypeEffect(route.params.pipe(pluck('calendarTypeId')))
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
{ label: 'User Calendars', value: item?.userCalendars },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    { label: 'User Calendar', path: 'user-calendar', data: item?.userCalendars }
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadCalendarTypeEffect = this.effect<string>((calendarTypeId$) =>
    calendarTypeId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((calendarTypeId) =>
        this.data.userCalendarType({ calendarTypeId }).pipe(
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

  readonly deleteCalendarTypeEffect = this.effect<CalendarType>(
    (calendarType$) =>
      calendarType$.pipe(
        switchMap((calendarType) =>
          this.data
            .userDeleteCalendarType({
              calendarTypeId: calendarType.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/calendar-types']),
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

