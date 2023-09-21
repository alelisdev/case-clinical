import { Injectable, Injector } from "@angular/core";
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { WebCoreDataAccessService, CorePaging, Appointment, NovuNotification } from '@case-clinical/web/core/data-access';
import { switchMap, tap, withLatestFrom } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { Router } from "@angular/router";
import { WebUiToastService } from "@case-clinical/web/ui/toast";
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';

export interface NotificationsState extends ProviderBaseState {
  loading: boolean,
  query: string,
  notifications: any[],
  tag: string,
  read: boolean,
  paging?: CorePaging,
}

@Injectable()
export class NotificationsStore extends ProviderBaseStore<NotificationsState> {
  locationAvalabilityId = "";

  documentsUploadModalCtrl?: FormlyModalController
  rescheduleModalCtrl?: FormlyModalController

  constructor(
    private data: WebCoreDataAccessService,
    private toast: WebUiToastService,
    private appointmentStore: WebAppointmentFeatureStore,
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
    this.notifications$,
    this.vendor$,
    (
      loading,
      user,
      notifications,
      vendor
    ) => {
      return {
        loading,
        user,
        notifications,
        vendor
      }
    }
  );

  setStatusWatch = this.effect<string>(formData$ => formData$.pipe(
    tap((notificationId) => { this.patchState({ loading: true }); }),
    switchMap((notificationId) => this.data.updateReadStatus({
        notificationId,
    }).pipe(
      tapResponse(
        (data) => {
          this.patchState({
            loading: false,
          });
        },
        (error) => {
          this.patchState({
            loading: false,
          });
        }
      )
    ))
  ));

  loadNotificationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true, notifications: [] }) }),
    withLatestFrom(this.tag$, this.read$, this.paging$),
    switchMap(([, tag, read, paging]) => {
      return this.data.userNovuNotifications({ input: { tag, read, limit: paging?.limit, skip: paging?.skip } }).pipe(
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

  tagQueryDidChange(tag: string) {
    this.setTag(tag);
    this.loadNotificationsEffect();
  }

  readFilterDidChange(tabName: string) {
    if(tabName === 'read') {
      this.setRead(true);
    } else {
      this.setRead(false);
    }
    this.loadNotificationsEffect();
  }

  checkInAppointment(notification: NovuNotification) {
    const { id, appointment } = notification;
    if(appointment) {
      this.appointmentStore.checkInAppointmentEffect(appointment);
      const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
        const { done } = result;
        if(done) {
          subscriber.unsubscribe();
          this.data.updateReadStatus({ notificationId: id as string }).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.toast.error('Cannot find appointment data');
    }
  }

  cancelAppointment(notification: NovuNotification) {
    const { id, appointment } = notification;
    if(appointment) {
      this.appointmentStore.cancelAppointmentEffect(appointment);
      const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
        const { done } = result;
        if(done) {
          subscriber.unsubscribe();
          this.data.updateReadStatus({ notificationId: id as string }).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.toast.error('Cannot find appointment data');
    }
  }

  hideAppointment(notification: NovuNotification) {
    const { id, appointment } = notification;
  if(appointment) {
      this.appointmentStore.hideAppointmentEffect(appointment);
      const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
        const { done } = result;
        if(done) {
          subscriber.unsubscribe();
          this.data.updateReadStatus({ notificationId: id as string }).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.toast.error('Cannot find appointment data');
    }
  }

  /** Documents Upload */
  setDocumentsUploadModalCtrl(ctrl: FormlyModalController) {
    this.documentsUploadModalCtrl = ctrl;
  }

  openDocumentsUploadModal(notification: NovuNotification) {
    const { id, appointment } = notification;
    this.documentsUploadModalCtrl?.open({
      notificationId: id,
      appointmentId: notification.appointment?.id,
      appointmentName: notification.appointment?.name,
      bill: appointment?.bill,
      medicalReport: appointment?.medicalReport,
      imaging: appointment?.imaging,
      miscellaneous: appointment?.miscellaneous,
    }, {}, this);
  }

  uploadDocuments(model: any) {
    const { notificationId, appointmentId, appointmentName, bill, medicalReport, imaging, miscellaneous } = model;
    const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
      const { done } = result;
      if(done) {
        subscriber.unsubscribe();
        this.data.updateReadStatus({ notificationId: notificationId as string }).subscribe();
        this.documentsUploadModalCtrl?.close();
        this.router.navigate(['dashboard']);
      }
    })
    this.appointmentStore.updateAppointmentEffect({ bill, medicalReport, imaging, miscellaneous, id: appointmentId, name: appointmentName })
  }
  /** Documents Upload */

  /** Reschedule Appointment */
  setRescheduleModalCtrl(ctrl: FormlyModalController) {
    this.rescheduleModalCtrl = ctrl;
  }

  openRescheduleModal(notification: NovuNotification) {
    const { id, appointment } = notification;
    this.rescheduleModalCtrl?.open({
      notificationId: id,
      appointmentId: appointment?.id,
      appointmentName: appointment?.name,
    }, {}, this);
  }

  rescheduleAppoitment(model: any) {
    const { notificationId, appointmentId, appointmentName, rescheduleDate } = model;
    console.log({ appointmentId, appointmentName, rescheduleDate });
    const subscriber = this.appointmentStore.actionResult$.subscribe((result) => {
      const { done } = result;
        if(done) {
          subscriber.unsubscribe();
          this.rescheduleModalCtrl?.close()
          this.data.updateReadStatus({ notificationId: notificationId as string }).subscribe();
          this.router.navigate(['dashboard'])
        }
    })
    this.appointmentStore.rescehduleAppointmentEffect({ appointment: { id: appointmentId, name: appointmentName }, rescheduleDate  })
  }
  /** Reschedule Appointment */

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
