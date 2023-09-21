import { ActivatedRoute, Router } from '@angular/router'
import { DatePipe } from '@angular/common';
import { FormService } from '@case-clinical/web/ui/form';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { Injectable, Injector } from "@angular/core";
import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store';
import { WebCoreDataAccessService, CorePaging } from '@case-clinical/web/core/data-access'; 
import { switchMap, tap, withLatestFrom } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { formatRelativeTime } from '@case-clinical/shared/util/helpers';

export interface NotificationsState extends AttorneyBaseState {
  loading: boolean,
  query: string,
  notifications: any[],
  tag: string,
  read: boolean,
  paging: CorePaging
}

@Injectable()
export class NotificationsStore extends AttorneyBaseStore<NotificationsState> {
  private subscriber: any;
  locationAvalabilityId = "";
  constructor( 
    private data: WebCoreDataAccessService,
    private datePipe: DatePipe,
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
  paging$ = this.select((s) => s.paging)

  setTag = this.updater((state, tag: string) => ({ ...state, tag }))
  setRead = this.updater((state, read: boolean) => ({ ...state, read }))

  vm$ = this.select(
    this.loading$,
    this.user$, 
    this.notifications$,
    (
      loading,
      user, 
      notifications,
    ) => {
      return {
        loading,
        user, 
        notifications
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
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.tag$, this.read$, this.paging$),
    switchMap(([, tag, read, paging]) => {
      console.log({ tag, read, paging })
      return this.data.userNovuNotifications({ input: { tag, read, limit: paging?.limit, skip: paging?.skip } }).pipe(
        tapResponse(
          (response) => {
            const novuNotifications = response.data.notifications?.map((notification)=>{
              return {
                ...notification,
                formatRelativeTime:formatRelativeTime(new Date(notification.createdAt))

              }
            })

            this.patchState({
              paging: { limit: response.data.count?.limit, skip: response.data.count?.skip, total: response.data.count?.total },
              loading: false,
              notifications: novuNotifications ?? []
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

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip,
    },
  }))
  
  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit,
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
    console.log(tabName)
    if(tabName === 'read') {
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
      paging:{
        skip: 0,
        limit: 10,
      }
    }
  }


}
