import { AttorneyBaseComponent } from '../attorney-base.component';
import { Component } from '@angular/core'
import { DoctorsSearchStore } from './doctors-search.component.store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared';
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';

@Component({
  selector: 'case-clinical-doctors-search',
  providers: [
    DoctorsSearchStore,
    WebAppointmentFeatureStore,
    WebDocumentFeatureStore,
    WebLegalCaseFeatureStore,
    WebSpecialtyFeatureStore,
    {
      provide: 'listProviderLocationStore',
      useClass: WebClinicalProviderLocationFeatureStore,
    },
  ],
  templateUrl: './doctors-search.component.html',
  styleUrls: ['./doctors-search.component.scss'],
})
export class DoctorsSearchComponent extends AttorneyBaseComponent{
  pageName = 'Doctors Search';
  portalName = "Attorney";
  model:any = {
    distance: '100',
  }
  constructor(public store: DoctorsSearchStore) {
    super();
    const queryFilter = localStorage.getItem('queryFilter');
    const distanceFilter = localStorage.getItem('distanceFilter');
    const addressFilter = localStorage.getItem('addressFilter');
    const specialtyFilter = localStorage.getItem('specialtyFilter');
    if(queryFilter){
      this.model.providerName = queryFilter
    }

    if(distanceFilter){
      this.model.distance = distanceFilter
    }

    if(addressFilter){
      this.model.centerLocation = JSON.parse(addressFilter!)
    }

    if(specialtyFilter){
      this.model.multiSelect = specialtyFilter?.split(",")[0] == "" ? [] : specialtyFilter?.split(",")
    }

  }

  

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      previewImage: this.store.attachment$,
      attorneys: this.store.attorneyOptions$,

      specialties:this.store.specialties$,
      providerLocations: this.store.providerLocations$,
      mapProviderLocations: this.store.mapProviderLocations$,
    }
  }
}
