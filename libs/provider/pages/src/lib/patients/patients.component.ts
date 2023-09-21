import { Component, OnDestroy } from '@angular/core'
import { PatientStore } from './patients.component.store';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';
import { ProviderBaseComponent }  from '../provider-base.component'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared';

@Component({
  selector: 'provider-patients',
  providers: [
    PatientStore,
    WebPatientFeatureStore,
    WebVendorLocationFeatureStore,
    WebClinicalProviderLocationFeatureStore
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent extends ProviderBaseComponent implements OnDestroy {
  portalName = "Vendor";
  pageName = 'My Patients';
  model: any = {}
  selectedProviderId$ = this.store.selectedProviderId$;
  subscriber;
  vm$ = this.store.vm$;
  constructor(public store: PatientStore) {
    super();
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
      patientList: this.store.patientList$,
      pageName: this.pageName,
      providers: this.store.providerOptions$,
      portalName: this.portalName,
      paging: this.store.paging$,
      providerLocations: this.store.providerLocationOptions$,
      vendorLocations: this.store.vendorLocationOptions$
    }
  }
}
