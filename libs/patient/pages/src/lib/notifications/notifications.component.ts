import { Component, OnDestroy } from '@angular/core'
import { NotificationsStore } from './notifications.component.store'
import { PatientBaseComponent } from '../patient-base.component'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';

@Component({
  selector: 'patient-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationsStore, WebAppointmentFeatureStore],
})
export class NotificationsComponent extends PatientBaseComponent implements OnDestroy {
  subscriber: any
  pageName = 'Notifications'
  portalName = 'Patient'
  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {}

  constructor(public store: NotificationsStore) {
    super()
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId
    })
  }

  vm$ = this.store.vm$

  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      memberships: this.store.memberships$,
      paging: this.store.paging$,
    }
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }
}
