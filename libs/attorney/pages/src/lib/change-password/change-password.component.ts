import { AttorneyBaseComponent } from '../attorney-base.component';
import { ChangePasswordStore } from './change-password.component.store'
import { Component } from '@angular/core'

@Component({
  selector: 'case-clinical-change-password',
  providers: [
    ChangePasswordStore,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends AttorneyBaseComponent{
  pageName = 'ChangePassword';
  portalName = "Attorney";
  subscriber: any
  
  selectedAttorneyId$ = this.store.selectedAttorneyId$

  constructor(public store: ChangePasswordStore) {
    super();
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$
    }
  }
}
