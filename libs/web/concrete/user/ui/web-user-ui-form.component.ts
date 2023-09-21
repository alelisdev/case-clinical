
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebUserFormStore } from './web-user-form.store'
import { User, } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-user-form',
  providers: [WebUserFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="User"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(user))" [model]="user" [fields]="fields" [form]="form">
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
export class WebFormsUiUserComponent
    {
  @Input() user: User = {}
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

WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.checkbox('developer', { label: 'Developer' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('username', { label: 'Username' }, {className: 'w-full  px-1'}),
WebUiFormField.input('password', { label: 'Password' }, {className: 'w-full  px-1'}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full  px-1'}),
WebUiFormField.input('avatarUrl', { label: 'Avatar Url' }, {className: 'w-full  px-1'}),
WebUiFormField.input('line1', { label: 'Line 1' }, {className: 'w-full  px-1'}),
WebUiFormField.input('line2', { label: 'Line 2' }, {className: 'w-full  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'w-full  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'w-full  px-1'}),
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'w-full  px-1'}),
WebUiFormField.input('phone', { label: 'Phone' }, {className: 'w-full  px-1'}),
WebUiFormField.input('bio', { label: 'Bio' }, {className: 'w-full  px-1'}),
WebUiFormField.input('slug', { label: 'Slug' }, {className: 'w-full  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date Of Birth' }, {className: 'w-full  px-1'}),
WebUiFormField.input('cellPhone', { label: 'Cell Phone' }, {className: 'w-full  px-1'}),
WebUiFormField.input('education', { label: 'Education' }, {className: 'w-full  px-1'}),
WebUiFormField.input('officeName', { label: 'Office Name' }, {className: 'w-full  px-1'}),
,
,
,
,
,
,
,
,
,
,
,
				])

]

  constructor(
    private readonly store: WebUserFormStore,
  ) {}

  submit({
name,developer,username,password,firstName,lastName,avatarUrl,line1,line2,city,state,postalCode,phone,bio,slug,dateOfBirth,cellPhone,education,officeName
  }) {
    this.send.emit({
name,developer,username,password,firstName,lastName,avatarUrl,line1,line2,city,state,postalCode,phone,bio,slug,dateOfBirth,cellPhone,education,officeName
    })
  }

handleDiscardClick(event) { }
}
