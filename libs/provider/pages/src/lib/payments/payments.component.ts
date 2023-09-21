import { Component } from '@angular/core'
import { PaymentStore } from './payments.component.store';
import { ProviderBaseComponent }  from '../provider-base.component'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';

@Component({
  selector: 'provider-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers:[
    PaymentStore,
    WebInvoiceFeatureStore,
    WebDocumentFeatureStore,
  ]
})
export class PaymentsComponent extends ProviderBaseComponent{
  pageName = 'Eop';
  portalName = "Vendor";

  selectedProviderId$ = this.store.selectedProviderId$;
  vm$ = this.store.vm$;

  constructor(public store: PaymentStore) {
    super();
  }

  formData={
    pageName: this.pageName,
    portalName: this.portalName,
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      invoices: this.store.invoices$,
      attchment: this.store.attachment$,
      invoicesPaging$: this.store.invoicesPaging$,
      providers: this.store.providerOptions$,
      portalName: this.portalName,
    }
  }
}
