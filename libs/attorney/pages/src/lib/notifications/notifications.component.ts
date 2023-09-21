import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component, OnDestroy } from '@angular/core'
import { NotificationsStore } from './notifications.component.store'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'

@Component({
  selector: 'case-clinical-notifications',
  providers: [NotificationsStore],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent extends AttorneyBaseComponent implements OnDestroy {
  pageName = 'Notifications'
  portalName = 'Attorney'
  subscriber: any
  model: any = {}

  selectedAttorneyId$ = this.store.selectedAttorneyId$

  subscriberId: string | undefined = undefined

  vm$ = this.store.vm$

  constructor(public store: NotificationsStore, private authStore: WebAuthStore) {
    super()
    this.subscriber = this.store.selectedAttorneyId$.subscribe((AttorneyId) => {
      this.model['AttorneyId'] = AttorneyId
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }

  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$,
      paging: this.store.paging$
    }
  }
}
