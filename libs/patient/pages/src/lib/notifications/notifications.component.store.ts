import { DatePipe } from '@angular/common';
import { Injectable, Injector } from "@angular/core";
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { WebCoreDataAccessService, CorePaging, NovuNotification } from '@case-clinical/web/core/data-access';
import { switchMap, tap, withLatestFrom } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { formatRelativeTime } from '@case-clinical/shared/util/helpers';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { WebUiToastService } from "@case-clinical/web/ui/toast";
import { Router } from "@angular/router";

export interface NotificationsState extends PatientBaseState {
  loading: boolean,
  query: string,
  notifications: any[],
  tag: string,
  read: boolean,

  paging?: CorePaging
}

@Injectable()
export class NotificationsStore extends PatientBaseStore<NotificationsState> {
  locationAvalabilityId = "";
  constructor(
    private datePipe: DatePipe,
    private data: WebCoreDataAccessService,
    private appointmentStore: WebAppointmentFeatureStore,
    private toast: WebUiToastService,
    private router: Router,
    injector: Injector
  ) {
    super(injector)
    this.setLimit(10);
    this.setSkip(0);

  }

  loading$ = this.select(s => s.loading)
  tag$ = this.select((s) => s.tag)
  read$ = this.select((s) => s.read)
  notifications$ = this.select((s) => s.notifications)
  readonly paging$ = this.select((s) => s.paging)

  setTag = this.updater((state, tag: string) => ({ ...state, tag }))
  setRead = this.updater((state, read: boolean) => ({ ...state, read }))

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.membership$,
    this.notifications$,
    (
      loading,
      user,
      membership,
      notifications,
    ) => {
      return {
        loading,
        user,
        membership,
        notifications
      }
    }
  );

  loadNotificationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.tag$, this.read$, this.paging$),
    switchMap(([, tag, read, paging]) => {
      console.log({ tag, read, paging })
      return this.data.userNovuNotifications({ input: { tag, read, limit: paging?.limit, skip: paging?.skip, } }).pipe(
        tapResponse(
          (response) => {
            this.patchState({
              paging: { limit: response.data.count?.limit, skip: response.data.count?.skip, total: response.data.count?.total },
              loading: false,
              notifications: response.data.notifications ?? []
            })
          },
          (error) => {
            console.log(error)
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ))

  setStatusWatch = this.effect<string>(formData$ => formData$.pipe(
    tap(() => { this.patchState({ loading: true }); }),
    switchMap((notificationId) => this.data.updateReadStatus({
      notificationId,
    }).pipe(
      tapResponse(
        () => {
          this.patchState({
            loading: false,
          });
        },
        () => {
          this.patchState({
            loading: false,
          });
        }
      )
    ))
  ));



  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit,
    },
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip,
    },
  }))

  skipDidChange(skip: number) {
    this.setSkip(skip);
    this.loadNotificationsEffect()
  }


  cancelAppointment(notification: NovuNotification) {
    const { id, appointment } = notification;
    if (appointment) {
      this.appointmentStore.cancelAppointmentEffect(appointment);
      const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
        const { done } = result;
        if (done) {
          subscriber.unsubscribe();
          this.data.updateReadStatus({ notificationId: id as string }).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.toast.error('Cannot find appointment data');
    }
  }

  confirmAppointment(notification: NovuNotification) {
    const { id, appointment } = notification;
    if (appointment) {
      this.appointmentStore.confirmAppointmentEffect(appointment);
      const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
        const { done } = result;
        if (done) {
          subscriber.unsubscribe();
          this.data.updateReadStatus({ notificationId: id as string }).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.toast.error('Cannot find appointment data');
    }
  }

  cancelRescheduleRequest(notification: NovuNotification) {
    const { id } = notification;
    this.data.updateReadStatus({ notificationId: id as string }).subscribe();
    this.router.navigate(['dashboard']);
  }

  confirmRescheduleRequest(notification: NovuNotification) {
    const { id, appointment } = notification;
    if (appointment) {
      this.appointmentStore.requestRescehduleAppointmentEffect(appointment);
      const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
        const { done } = result;
        if (done) {
          subscriber.unsubscribe();
          this.data.updateReadStatus({ notificationId: id as string }).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.toast.error('Cannot find appointment data');
    }
  }

  tagQueryDidChange(tag: string) {
    this.setTag(tag);
    this.loadNotificationsEffect();
  }

  readFilterDidChange(tabName: string) {
    console.log(tabName)
    if (tabName === 'read') {
      this.setRead(true);
    } else {
      this.setRead(false);
    }
    this.loadNotificationsEffect();
  }

  override getInitialState(): NotificationsState {
    return {
      query: "",
      loading: false,
      notifications: [],
      tag: "",
      read: false,
    }
  }


}
