import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared';
import { Component } from '@angular/core'
import { PatientProfileStore } from './profile.component.store';
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { PatientBaseComponent } from '../patient-base.component';

@Component({
  selector: 'patient-profile',
  templateUrl: './profile.component.html',
  providers: [ PatientProfileStore, WebSpecialtyFeatureStore, WebGenderFeatureStore, ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends PatientBaseComponent{


  portalName = "Patient";
  pageName = 'Profile';

  model$ = this.store.model$;
  vm$ = this.store.vm$;

  model: any = {};

  formData = {
    portalName: this.portalName,
    pageName: this.pageName,
  }

  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      genders: this.store.genders$,
      memberships: this.store.memberships$,
    }
  }

  constructor(public store: PatientProfileStore) {
    super();
    //this.store.loadProfile();
  }
}
