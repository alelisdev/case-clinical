
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,UserCalendar } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface UserCalendarDetailState {
  errors ?: any
  loading?: boolean
  item?: UserCalendar
}

@Injectable()
export class WebUserCalendarDetailStore extends ComponentStore<UserCalendarDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadUserCalendarEffect(route.params.pipe(pluck('userCalendarId')))
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
//{f.name}
//{f.name}
//{f.name}
//{f.name}
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

  readonly deleteUserCalendarEffect = this.effect<UserCalendar>(
    (userCalendar$) =>
      userCalendar$.pipe(
        switchMap((userCalendar) =>
          this.data
            .userDeleteUserCalendar({
              userCalendarId: userCalendar.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/user-calendars']),
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

