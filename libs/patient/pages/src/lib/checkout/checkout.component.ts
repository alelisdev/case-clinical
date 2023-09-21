import { Component, OnDestroy } from '@angular/core'
import { CheckOutStore } from './checkout.component.store';
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { PatientBaseComponent } from '../patient-base.component';

@Component({
  selector: 'patient-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers:[
    CheckOutStore,
    WebAppointmentFeatureStore,
    WebClinicalProviderLocationAvailabilityFeatureStore,
    WebClinicalProviderFeatureStore
  ]
})
export class CheckoutComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Checkout';
  portalName = "Patient";

  subscriber: any;
  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {};

  constructor(public store: CheckOutStore) {
    super();
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    })
  }

  vm$ = this.store.vm$

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      memberships: this.store.memberships$,
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
