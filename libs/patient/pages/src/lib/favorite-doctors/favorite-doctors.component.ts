import { Component, OnDestroy } from '@angular/core'
import { FavoriteDoctorsStore } from './favorite.component.store'
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { PatientBaseComponent } from '../patient-base.component';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

@Component({
  selector: 'patient-favorite-doctors',
  templateUrl: './favorite-doctors.component.html',
  providers: [
    FavoriteDoctorsStore,
    WebDocumentFeatureStore,
    WebFavoriteProviderFeatureStore,
    WebClinicalProviderLocationFeatureStore
  ],
  styleUrls: ['./favorite-doctors.component.scss'],
})
export class FavoriteDoctorsComponent extends PatientBaseComponent implements OnDestroy {

  pageName = 'Favorites';
  portalName = "Patient";

  subscriber: any;
  vm$ = this.store.vm$;

  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {};

  constructor(public store: FavoriteDoctorsStore) {
    super();
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    })
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      providerLocations: this.store.providerLocations$,
      memberships: this.store.memberships$,
      previewImage: this.store.attachment$,
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
