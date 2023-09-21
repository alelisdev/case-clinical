import { Component, OnDestroy } from '@angular/core'
import { InvoicesStore } from './invoices.component.store'
import { AttorneyBaseComponent } from '../attorney-base.component'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'

@Component({
  selector: 'case-clinical-invoices',
  providers: [InvoicesStore, WebInvoiceFeatureStore],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent extends AttorneyBaseComponent {
  pageName = 'Invoices'
  portalName = 'Attorney'
  subscriber: any

  selectedAttorneyId$ = this.store.selectedAttorneyId$

  constructor(public store: InvoicesStore) {
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
