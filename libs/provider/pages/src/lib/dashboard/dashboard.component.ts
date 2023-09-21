import { Component, OnDestroy } from '@angular/core'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { DashboardStore } from './dashboard.component.store';
import { ProviderBaseComponent } from '../provider-base.component';
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';

@Component({
  selector: 'provider-dashboard',
  providers: [
    DashboardStore,
    WebAppointmentStatusFeatureStore,
    WebVisitKindFeatureStore,
    WebClinicalProviderLocationFeatureStore,
    {
      provide: 'apptStatusStoreForFilter',
      useClass: WebAppointmentStatusFeatureStore,
    },
    {
      provide: 'providerStoreForAppointmentAdd',
      useClass: WebClinicalProviderFeatureStore,
    },


    {
      provide: 'providerLocationStoreForAppointmentAdd',
      useClass: WebClinicalProviderLocationFeatureStore,
    },
    {
      provide: 'calendarAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'listAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    WebLegalCaseFeatureStore,
    {
      provide: 'legalCaseStoreForAppointmentAdd',
      useClass: WebLegalCaseFeatureStore,
    },
    WebPatientFeatureStore
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends ProviderBaseComponent implements OnDestroy {
  pageName = 'Dashboard';
  portalName = "Vendor";
  model: any = {}
  vm$ = this.store.vm$;
  subscriber;
  selectedProviderId$ = this.store.selectedProviderId$;

  constructor(public store: DashboardStore) {
    super();
    this.store.loadVendorStatsEffect();

    this.subscriber = this.store.selectedProviderId$.subscribe((selectedProviderId) => {
      this.model['providerId'] = selectedProviderId;
    });
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      providers: this.store.providerOptionsForFilter$,
      providerLocations: this.store.providerLocationOptions$,
      appointmentStatusesForFilter:this.store.appointmentStatusesForFilter$,
      portalName: this.portalName,
      paging: this.store.paging$,
      patients: this.store.patients$,
      appointments: this.store.appointments$,
      timeEvents: this.store.calendarTimeEvents$,
    }
  }
}
