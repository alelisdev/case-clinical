import { Component } from '@angular/core'
import { sheduleTimingStore } from './shedule-timing.component.store'
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { ProviderBaseComponent }  from '../provider-base.component'

@Component({
  selector: 'provider-shedule-timing',
  providers: [
    sheduleTimingStore,
    WebClinicalProviderLocationAvailabilityFeatureStore,
    WebClinicalProviderFeatureStore,
    WebClinicalProviderLocationFeatureStore,
  ],
  templateUrl: './shedule-timing.component.html',
  styleUrls: ['./shedule-timing.component.scss'],
})

export class SheduleTimingComponent extends ProviderBaseComponent{
  portalName = "Vendor";
  pageName = 'Schedule Timing';

  vm$ = this.store.vm$

  selectedProviderId$ = this.store.selectedProviderId$;
  model: any = {};

  constructor(public store: sheduleTimingStore) {
    super();
    this.store.selectedProviderId$.subscribe((providerId) => {
      this.model['providerId'] = providerId;
    });

    this.store.locations$.subscribe((locations) => {
      if(locations.length > 0)
        this.model = {
          ...this.model,
          providerLocationId: locations[0].id
        }
      else this.model = {
        ...this.model,
        providerLocationId: ""
      }
    });
  }

  getFormData(data: any) {
    return {
      ...data,
      providers: this.store.providerOptions$,
      locations: this.store.locations$,
      pageName: this.pageName,
      portalName: this.portalName,
    }
  }
}
