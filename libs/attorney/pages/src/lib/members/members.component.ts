import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component } from '@angular/core'
import { MembersStore } from './members.component.store'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

@Component({
  selector: 'case-clinical-members',
  providers: [MembersStore, WebLegalCaseFeatureStore, WebLeadFeatureStore],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent extends AttorneyBaseComponent {
  pageName = 'Members'
  portalName = 'Attorney'
  subscriber: any

  selectedAttorneyId$ = this.store.selectedAttorneyId$

  constructor(public store: MembersStore) {
    super()
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$,
    }
  }
}
