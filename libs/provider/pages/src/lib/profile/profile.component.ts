import { Component } from '@angular/core'
import { ProviderProfileStore } from './profile.component.store';
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { ProviderBaseComponent }  from '../provider-base.component'

@Component({
  selector: 'provider-profile',
  templateUrl: './profile.component.html',
  providers: [ ProviderProfileStore, WebSpecialtyFeatureStore ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends ProviderBaseComponent{
  portalName = "Vendor";
  pageName = 'Profile';
  me$ = this.store.me$;

  formData = {
    portalName: this.portalName,
    pageName: this.pageName,
  }

  constructor(public store: ProviderProfileStore) {
    super();
  }
}
