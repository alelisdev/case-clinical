import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component } from '@angular/core'
import { StatusesStore } from './statuses.component.store'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

@Component({
  selector: 'case-clinical-satuses',
  providers: [StatusesStore, WebLegalCaseFeatureStore],
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss'],
})
export class StatusesComponent extends AttorneyBaseComponent {
  pageName = 'Statuses'
  portalName = 'Attorney'
  subscriber: any
  model: any = {}
  selectedAttorneyId$ = this.store.selectedAttorneyId$

  constructor(public store: StatusesStore) {
    super()
    this.store.attorneyOptions$.subscribe((options) => {
      console.log(options)
    })

    this.subscriber = this.store.selectedAttorneyId$.subscribe((attorneyId) => {
      this.model['attorneyId'] = attorneyId
    })

  }

  vm$ = this.store.vm$
  getFormData(data: any) {    
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$,
      colDefs: ['name', 'state'],
      gridData: this.store.$gridData,
      masterColDefs: ['id', 'name'],
      formModel: {        
        caseStatusId: "clgx9gpsy000cqf012j0q3mv6"
      }
    }
  }
}
