import { AttorneyBaseComponent } from '../attorney-base.component';
import { Component } from '@angular/core'
import { FavoriteDoctorsStore } from './favorite.component.store'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared';

@Component({
  selector: 'case-clinical-favorite-doctors',
  templateUrl: './favorite-doctors.component.html',
  providers: [
    FavoriteDoctorsStore,
    WebDocumentFeatureStore,
    WebFavoriteProviderFeatureStore,
    WebClinicalProviderFeatureStore,
  ],
  styleUrls: ['./favorite-doctors.component.scss'],
})
export class FavoriteDoctorsComponent extends AttorneyBaseComponent {

  pageName = 'Favorites';
  portalName = "Attorney";

  subscriber: any;
  vm$ = this.store.vm$;

  selectedAttorneyId$ = this.store.selectedAttorneyId$
  model: any = {};

  constructor(public store: FavoriteDoctorsStore) {
    super();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      attorneys: this.store.attorneyOptions$,
      previewImage: this.store.attachment$,
    }
  }

}
