import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component } from '@angular/core'
import { DashboardStore } from './dashboard.component.store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared'

@Component({
  selector: 'case-clinical-dashboard',
  providers: [
    DashboardStore,
    WebAppointmentFeatureStore,
    {
      provide: 'calendarAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'listAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'listProviderLocationStore',
      useClass: WebClinicalProviderLocationFeatureStore,
    },
    WebAttorneyFeatureStore,
    WebLeadFeatureStore,
    WebLegalCaseFeatureStore,
    WebLocationFeatureStore,
    WebReviewFeatureStore
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends AttorneyBaseComponent {
  pageName = 'Dashboard'
  portalName = 'Attorney'
  vm$ = this.store.vm$
  selectedAttorneyId$ = this.store.selectedAttorneyId$

  model = {
    searchRange: '100',
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      attorneys: this.store.attorneyOptions$,
      locations: this.store.locations$,
      legalCasesPaging: this.store.legalCasesPaging$,
      legalCases: this.store.legalCases$,
      appointmentEvents: this.store.appointmentEvents$,
      specialties: this.store.specialties$,
      services: this.store.services$,
      providerLocations: this.store.providerLocations$,
      mapProviderLocations: this.store.mapProviderLocations$,
    }
  }

  constructor(public store: DashboardStore) {
    super();
  }
}
