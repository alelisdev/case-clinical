
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebInvoiceDetailFormStore } from './web-invoice-detail-form.store'
import { InvoiceDetail,Invoice } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-invoice-detail-form',
  providers: [WebInvoiceDetailFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Invoice Detail"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(invoiceDetail))" [model]="invoiceDetail" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label = "Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label = "Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiInvoiceDetailComponent
    {
  @Input() invoiceDetail: InvoiceDetail = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.select(
          'invoiceId',
          {
            label: 'Invoice',
            options: [{id: 'CREATE', name: 'Create New Invoice'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterInvoices('').pipe(
                  map((x:Invoice)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),

WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.date('dateOfService', { label: 'Date Of Service' }, {className: 'w-full  px-1'}),
WebUiFormField.input('providerName', { label: 'Provider Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('procedureDescription', { label: 'Procedure Description' }, {className: 'w-full  px-1'}),
WebUiFormField.number('quantity', { label: 'Quantity' }, {className: 'w-full  px-1'}),
WebUiFormField.number('charges', { label: 'Charges' }, {className: 'w-full  px-1'}),
WebUiFormField.number('lineTotal', { label: 'Line Total' }, {className: 'w-full  px-1'})				])

]

  constructor(
    private readonly store: WebInvoiceDetailFormStore,
  ) {}

  submit({
invoiceId,dateOfService,providerName,procedureDescription,quantity,charges,lineTotal
  }) {
    this.send.emit({
invoiceId,dateOfService,providerName,procedureDescription,quantity,charges,lineTotal
    })
  }

handleDiscardClick(event) { }
}
