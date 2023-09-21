import { Component } from '@angular/core'
import { ProviderBaseComponent }  from '../provider-base.component'
import { ProvidersStore } from './providers.component.store';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

@Component({
  selector: 'provider-providers',
  providers: [ ProvidersStore, WebClinicalProviderFeatureStore,WebDocumentFeatureStore, WebClinicalProviderLocationFeatureStore ],
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent extends ProviderBaseComponent{
  vm$ = this.store.vm$;

  pageName = 'Providers';
  portalName = "Vendor";
  selectedProviderId$ = this.store.selectedProviderId$;
  constructor(public store: ProvidersStore) {
    super();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      providers: this.store.providerOptions$,
      providerLocations: this.store.providerLocationOptions$,
      previewImage: this.store.attachment$,

    }
  }
}
