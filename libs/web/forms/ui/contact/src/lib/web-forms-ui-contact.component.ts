
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Contact, } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Contact"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(contact))" [model]="contact" [fields]="fields" [form]="form">
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
export class WebFormsUiContactComponent
    {
  @Input() contact: Contact = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [				WebUiFormField.fieldRow([
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('suffix', { label: 'Suffix' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryPhoneNumber', { label: 'Primary Phone Number' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryEmailAddress', { label: 'Primary Email Address' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryAddressLine1', { label: 'Primary Address Line 1' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryAddressLine2', { label: 'Primary Address Line 2' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryAddressCity', { label: 'Primary Address City' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryAddressStateOrProvince', { label: 'Primary Address State Or Province' }, {className: 'w-full  px-1'}),
WebUiFormField.input('primaryAddressPostalCode', { label: 'Primary Address Postal Code' }, {className: 'w-full  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'w-full  px-1'}),
,
,
]


  submit({
name,firstName,lastName,suffix,primaryPhoneNumber,primaryEmailAddress,primaryAddressLine1,primaryAddressLine2,primaryAddressCity,primaryAddressStateOrProvince,primaryAddressPostalCode,notes
  }) {
    this.send.emit({
name,firstName,lastName,suffix,primaryPhoneNumber,primaryEmailAddress,primaryAddressLine1,primaryAddressLine2,primaryAddressCity,primaryAddressStateOrProvince,primaryAddressPostalCode,notes
    })
  }

handleDiscardClick(event) { }
}
