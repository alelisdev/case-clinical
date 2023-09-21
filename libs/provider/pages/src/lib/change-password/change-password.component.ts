import { Component } from '@angular/core'
import { ChangePasswordStore } from './change-password.component.store';
import { ProviderBaseComponent } from '../provider-base.component';

@Component({
  selector: 'provider-change-password',
  templateUrl: './change-password.component.html',
  providers: [
    ChangePasswordStore,
  ],
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends ProviderBaseComponent{
  pageName = 'Change Password';
  portalName = "Vendor";

  vm$ = this.store.vm$;

  formData = {
    pageName: this.pageName,
    portalName: this.portalName,
  }

  
  constructor(public store: ChangePasswordStore) {
    super();
  }

  getFormData(data: any) {
    // this.model['providerId'] = data.providerId;
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
    }
  }
}
