
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CalendarWeekday } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface CalendarWeekdayDetailState {
  errors ?: any
  loading?: boolean
  item?: CalendarWeekday
}

@Injectable()
export class WebCalendarWeekdayDetailStore extends ComponentStore<CalendarWeekdayDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadCalendarWeekdayEffect(route.params.pipe(pluck('calendarWeekdayId')))
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
{ label: 'Abbr', value: item?.abbr },
{ label: 'Label', value: item?.label },
{ label: 'Value', value: item?.value },
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

  readonly deleteCalendarWeekdayEffect = this.effect<CalendarWeekday>(
    (calendarWeekday$) =>
      calendarWeekday$.pipe(
        switchMap((calendarWeekday) =>
          this.data
            .userDeleteCalendarWeekday({
              calendarWeekdayId: calendarWeekday.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/calendar-weekdays']),
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

