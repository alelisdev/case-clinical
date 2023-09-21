
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'

@Component({
  selector: 'user-form',
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
export class UserFormComponent
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

fields = [				WebUiFormField.fieldRow([
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-1/4  px-1', hide: true}),
WebUiFormField.checkbox('developer', { label: 'Developer' }, { className: 'w-1/4  p-3' })				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('username', { label: 'Username' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('password', { label: 'Password' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('avatarUrl', { label: 'Avatar Url' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('line1', { label: 'Line 1' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('line2', { label: 'Line 2' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('state', { label: 'State' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('phone', { label: 'Phone' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('bio', { label: 'Bio' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('slug', { label: 'Slug' }, {className: 'w-1/4  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date Of Birth' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('cellPhone', { label: 'Cell Phone' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('education', { label: 'Education' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('weatherZip', { label: 'Weather Zip' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('firmId', { label: 'Firm Id' }, {className: 'w-1/4  px-1', hide: true})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.grid('settings', { label: 'Settings' } ),
WebUiFormField.grid('userRoles', { label: 'User Roles' } )				])
,
				WebUiFormField.fieldRow([
WebUiFormField.grid('caseNotes', { label: 'Case Notes' } ),
WebUiFormField.grid('intakes', { label: 'Intakes' } )				])
,
				WebUiFormField.fieldRow([
WebUiFormField.grid('teamUsers', { label: 'Team Users' } ),
WebUiFormField.grid('emails', { label: 'Emails' } )				])
,
				WebUiFormField.fieldRow([
WebUiFormField.grid('userCalendars', { label: 'User Calendars' } ),
WebUiFormField.grid('taskItems', { label: 'Task Items' } )				])
]


  submit({
developer,username,password,firstName,lastName,avatarUrl,line1,line2,city,state,postalCode,phone,bio,slug,dateOfBirth,cellPhone,education,weatherZip,firmId
  }) {
    this.send.emit({
developer,username,password,firstName,lastName,avatarUrl,line1,line2,city,state,postalCode,phone,bio,slug,dateOfBirth,cellPhone,education,weatherZip,firmId
    })
  }

handleDiscardClick(event) { }
}
