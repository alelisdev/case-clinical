import { Component, OnDestroy } from '@angular/core'
import { ChangePasswordStore } from './change-password.component.store';
import { PatientBaseComponent } from '../patient-base.component';

@Component({
  selector: 'patient-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [
    ChangePasswordStore
  ]
})
export class ChangePasswordComponent extends PatientBaseComponent implements OnDestroy {
  subscriber: any
  pageName = 'Change Password';
  portalName = "Patient";
  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {};

  constructor(public store: ChangePasswordStore) {
    super();
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    })
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      memberships: this.store.memberships$
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
