import { AppointmentStore } from './appointments.component.store'
import { Component, OnDestroy } from '@angular/core'
import { ProviderBaseComponent } from '../provider-base.component'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
@Component({
  selector: 'provider-appointments',
  providers: [
    AppointmentStore,
    WebAppointmentFeatureStore,
    WebClinicalProviderFeatureStore,
    WebClinicalProviderLocationFeatureStore,
    WebAppointmentStatusFeatureStore,
    {
      provide: 'apptStatusStoreForFilter',
      useClass: WebAppointmentStatusFeatureStore,
    },
    {
      provide: 'calendarAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'listAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent extends ProviderBaseComponent implements OnDestroy {
  portalName = 'Vendor'
  pageName = 'Appointments'
  model: any = {}
  subscriber: any

  vm$ = this.store.vm$
  selectedProviderId$ = this.store.selectedProviderId$

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      providers: this.store.providerOptions$,
      providersForFilter: this.store.providerOptionsForFilter$,

      providerLocations: this.store.providerLocationOptions$,
      appointmentStatusesForFilter:this.store.appointmentStatusesForFilter$,
      paging: this.store.paging$,
    }
  }

  constructor(public store: AppointmentStore) {
    super()
    this.subscriber = this.store.selectedProviderId$.subscribe((providerId) => {
      console.log('providerId', providerId)
      this.model['providerId'] = providerId
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }
}
