import { Component } from '@angular/core'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { ProvidersStore } from './provider-details.component.store'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { ProviderBaseComponent }  from '../provider-base.component'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'

@Component({
  selector: 'provider-provider-details',
  providers: [
    ProvidersStore, 
    WebClinicalProviderFeatureStore, 
    WebDocumentFeatureStore,
    WebTagFeatureStore,
    WebSpecialtyFeatureStore,
  ],
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss'],
})
export class ProviderDetailsComponent extends ProviderBaseComponent{
  vm$ = this.store.vm$

  pageName = 'Providers'
  portalName = 'Details'

  constructor(public store: ProvidersStore) {
    super();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      previewImage: this.store.attachment$,
    }
  }
}
