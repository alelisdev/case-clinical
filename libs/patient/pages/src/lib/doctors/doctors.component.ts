import { Component, OnDestroy } from '@angular/core'
import { DoctorsStore } from './doctors.component.store'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { PatientBaseComponent } from '../patient-base.component';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';

@Component({
  selector: 'patient-doctors',
  templateUrl: './doctors.component.html',
  providers: [
    DoctorsStore,
    WebSpecialtyFeatureStore,
    WebDocumentFeatureStore,
    WebFavoriteProviderFeatureStore,
    {
      provide: 'listProviderLocationStore',
      useClass: WebClinicalProviderLocationFeatureStore,
    },
  ],
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Doctors';
  portalName = "Patient";
  vm$ = this.store.vm$;

  model:any = {
    distance: '100',
  }


  constructor(public store: DoctorsStore) {
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
      this.model.multiSelect = (specialtyFilter?.split(",")[0] == "" ? [] : specialtyFilter?.split(","));
    }

  }

  getFormData(data: any) {
    return {
      ...data,
      specialties:this.store.specialties$,

      providerLocations: this.store.providerLocations$,
      mapProviderLocations: this.store.mapProviderLocations$,
      previewImage: this.store.attachment$,
      pageName: this.pageName,
      portalName: this.portalName,
    }
  }
  ngOnDestroy(): void {
    this.store.inputSubject.next('');
    this.store.inputSubject.complete();
  }

}
