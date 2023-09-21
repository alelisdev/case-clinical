
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebInvoiceFormStore } from './web-invoice-form.store'
import { Invoice,BatchControl,Organization,BillToPatient } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-invoice-form',
  providers: [WebInvoiceFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Invoice"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(invoice))" [model]="invoice" [fields]="fields" [form]="form">
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
export class WebFormsUiInvoiceComponent
    {
  @Input() invoice: Invoice = {}
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
          'batchControlId',
          {
            label: 'Batch Control',
            options: [{id: 'CREATE', name: 'Create New Batch Control'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterBatchControls('').pipe(
                  map((x:BatchControl)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'organizationId',
          {
            label: 'Organization',
            options: [{id: 'CREATE', name: 'Create New Organization'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterOrganizations('').pipe(
                  map((x:Organization)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'patientId',
          {
            label: 'Patient',
            options: [{id: 'CREATE', name: 'Create New Patient'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterBillToPatients('').pipe(
                  map((x:BillToPatient)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),

WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.input('invoiceNumber', { label: 'Invoice Number' }, {className: 'w-full  px-1'}),
WebUiFormField.number('amount', { label: 'Amount' }, {className: 'w-full  px-1'}),
WebUiFormField.number('paid', { label: 'Paid' }, {className: 'w-full  px-1'}),
WebUiFormField.number('due', { label: 'Due' }, {className: 'w-full  px-1'}),
				])

]

  constructor(
    private readonly store: WebInvoiceFormStore,
  ) {}

  submit({
name,invoiceNumber,amount,paid,due,batchControlId,organizationId,patientId
  }) {
    this.send.emit({
name,invoiceNumber,amount,paid,due,batchControlId,organizationId,patientId
    })
  }

handleDiscardClick(event) { }
}
