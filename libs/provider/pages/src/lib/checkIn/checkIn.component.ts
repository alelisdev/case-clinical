import { CheckInStore } from './checkIn.component.store'
import { Component } from '@angular/core'
import { ProviderBaseComponent } from '../provider-base.component'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

@Component({
  selector: 'provider-checkIn',
  providers: [
    CheckInStore,
    WebLegalCaseFeatureStore,
    WebLeadFeatureStore,
  ],
  templateUrl: './checkIn.component.html',
  styleUrls: ['./checkIn.component.scss'],
})
export class CheckInComponent extends ProviderBaseComponent {
  pageName = 'CheckIn'
  portalName = 'Vendor'
  subscriber: any

  constructor(public store: CheckInStore) {
    super()
  }

  appointment$ = this.store.appointment$
  selectedProviderId$ = this.store.selectedProviderId$;
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      providers: this.store.providerOptions$,
    }
  }
}
