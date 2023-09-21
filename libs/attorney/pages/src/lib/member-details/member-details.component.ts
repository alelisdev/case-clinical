import { Component } from '@angular/core'
import { AttorneyBaseComponent } from '../attorney-base.component';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared';
import { MemberDetailsStore } from './member-details.component.store';

@Component({
  selector: 'case-clinical-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
  providers: [
    WebLegalCaseFeatureStore,
    MemberDetailsStore,
  ]
})
export class MemberDetailsComponent extends AttorneyBaseComponent {
  pageName = 'Member Details'
  portalName = 'Attorney'

  vm$ = this.store.vm$

  constructor(public store: MemberDetailsStore) {
    super();
  }

  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
    }
  }
}
