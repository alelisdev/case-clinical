import { Component } from '@angular/core'
import { NotificationsStore } from './notifications.component.store';
import { ProviderBaseComponent } from '../provider-base.component';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';

@Component({
  selector: 'provider-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [ NotificationsStore, WebAppointmentFeatureStore ]
})
export class NotificationsComponent extends ProviderBaseComponent {
  portalName = "Vendor";
  pageName = 'Tasks';

  selectedProviderId$ = this.store.selectedProviderId$;
  vm$ = this.store.vm$;
  constructor(public store: NotificationsStore) {
    super();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      providers: this.store.providerOptions$,
      portalName: this.portalName,
      paging: this.store.paging$,
    }
  }
}
