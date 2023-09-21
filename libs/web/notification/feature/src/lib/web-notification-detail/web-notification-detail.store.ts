
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Notification } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface NotificationDetailState {
  errors ?: any
  loading?: boolean
  item?: Notification
}

@Injectable()
export class WebNotificationDetailStore extends ComponentStore<NotificationDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadNotificationEffect(route.params.pipe(pluck('notificationId')))
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
{ label: 'Title', value: item?.title },
{ label: 'Description', value: item?.description },
{ label: 'Type', value: item?.type },
{ label: 'Icon', value: item?.icon },
{ label: 'Image', value: item?.image },
{ label: 'Link', value: item?.link },
{ label: 'Use Router', value: item?.useRouter },
{ label: 'Time', value: item?.time },
{ label: 'Read', value: item?.read },

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

  readonly loadNotificationEffect = this.effect<string>((notificationId$) =>
    notificationId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((notificationId) =>
        this.data.userNotification({ notificationId }).pipe(
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

  readonly deleteNotificationEffect = this.effect<Notification>(
    (notification$) =>
      notification$.pipe(
        switchMap((notification) =>
          this.data
            .userDeleteNotification({
              notificationId: notification.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/notifications']),
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

