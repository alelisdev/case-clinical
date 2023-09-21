import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { NovuNotification } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { SettingsService } from '../business-logic/settings.service';
import { switchMap, tap } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface NotificationState {
  loading: boolean,
  query: string,
  notifications: NovuNotification[]
}

@Injectable()
export class NotificationStore extends ComponentStore<NotificationState> {
  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      query: "",
      loading: false,
      notifications: []
    })
  }

  loading$ = this.select(s => s.loading)
  notifications$ = this.select(s => s.notifications)

  adminNotifications$ = this.select(
    this.notifications$,
    (notifications) => {
      return notifications.filter((notification) => notification.isAdmin)
    }
  )

  userNotifications$ = this.select(
    this.notifications$,
    (notifications) => {
      return notifications.filter((notification) => !notification.isAdmin)
    }
  )

  vm$ = this.select(
    this.loading$,
    this.adminNotifications$,
    this.userNotifications$,
    (
      loading,
      adminNotifications,
      userNotifications,
      ) => ({
        loading,
        adminNotifications,
        userNotifications,
      })
  )

  updateNotification = this.updater((state, data: { id: string, subscribed: boolean }) => ({
    ...state,
    notifications: state.notifications.map(el => {
      if(el.id === data.id)
        return {
          ...el,
          subscribed: data.subscribed
        }
      else return el;
    })
  }))

  loadNotificationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => this.service.loadNovuNotifications().pipe(
      tapResponse(
        (notifications) => {
            this.patchState({
              loading: false,
              notifications
            })
          },
          (error) => {
            this.patchState({
              loading: false
            })
          }
        )
      )
    )
  ))

  subscribeNotificationEffect = this.effect<NovuNotification>(notification$ => notification$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap((notification) => this.service.subscribeNotification(notification.id).pipe(
      tapResponse(
        (data) => {
          this.toast.success('Successfully subscribed to ' + notification.name, { duration: 3000 })
            this.patchState({
              loading: false,
            })
            this.updateNotification({id: notification.id, subscribed: true})
          },
          (error) => {
            this.toast.error("Failed to subscribe to " + notification.name, { duration: 3000, autoClose: true })
            this.patchState({
              loading: false
            })
          }
        )
      )
    )
  ))

  unsubscribeNotificationEffect = this.effect<NovuNotification>(notification$ => notification$.pipe(
    tap((notification) => { this.patchState({ loading: true }) }),
    switchMap((notification) => this.service.unsubscribeNotification(notification.id).pipe(
      tapResponse(
        (data) => {
          this.toast.success('Successfully unsubscribed from ' + notification.name, { duration: 3 })
            this.patchState({
              loading: false,
            })
            this.updateNotification({id: notification.id, subscribed: false})
          },
          (error) => {
            this.toast.error("Failed to unsubscribe from " + notification.name, { duration: 3000})

            this.patchState({
              loading: false
            })
          }
        )
      )
    )
  ))
}
