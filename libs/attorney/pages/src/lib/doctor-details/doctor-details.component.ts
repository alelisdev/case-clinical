import { AttorneyBaseComponent } from '../attorney-base.component';
import { Component } from '@angular/core'
import { DoctorDetailsStore } from './doctor-details.component.store'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

@Component({
  selector: 'case-clinical-doctor-details',
  providers: [
    DoctorDetailsStore,
    WebClinicalProviderFeatureStore,
    WebClinicalProviderLocationFeatureStore,
    WebReviewFeatureStore,
    WebDocumentFeatureStore,
    WebLegalCaseFeatureStore
  ],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss'],
})
export class DoctorDetailsComponent extends AttorneyBaseComponent{
  pageName = 'Doctor-Detail'
  portalName = 'Attorney'
  subscriber: any

  selectedAttorneyId$ = this.store.selectedAttorneyId$

  constructor(public store: DoctorDetailsStore) {
    super();
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      previewImage: this.store.attachment$,
    }
  }
}
