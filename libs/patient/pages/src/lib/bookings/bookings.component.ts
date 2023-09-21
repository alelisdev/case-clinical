import { Component, OnDestroy } from '@angular/core'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { BookingsStore } from './bookings.component.store';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared';
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { PatientBaseComponent } from '../patient-base.component';

@Component({
  selector: 'patient-bookings',
  templateUrl: './bookings.component.html',
  providers: [
    BookingsStore,
    WebAppointmentFeatureStore,
    WebClinicalProviderFeatureStore,
    WebClinicalProviderLocationAvailabilityFeatureStore,
    WebLocationFeatureStore,
    WebClinicalProviderLocationFeatureStore
  ],
  styleUrls: ['./bookings.component.scss'],

})
export class BookingsComponent extends PatientBaseComponent implements OnDestroy{
  pageName = 'Booking';
  portalName = "Patient";

  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {};
  subscriber: any;
  constructor(public store: BookingsStore) {
    super();
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    })
  }
  
  vm$ = this.store.vm$
  locations$ = this.store.locations$;

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      locations: this.locations$,
    }
  }
}
