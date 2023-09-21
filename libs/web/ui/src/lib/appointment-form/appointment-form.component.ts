
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Appointment } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'

@Component({
  selector: 'appointment-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Appointment"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(appointment))" [model]="appointment" [fields]="fields" [form]="form">
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
export class AppointmentFormComponent
    {
  @Input() appointment: Appointment = {}
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
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1',
  hideExpression: (model: any, formState: any, field: FormlyFieldConfig) => {
    // access to the main model can be through `this.model` or `formState` or `model
    if (formState.mainModel && formState.mainModel?.name) {
      return formState.mainModel.name !== "123"
    }
    return true;
  },
 expressionProperties: {
  'templateOptions.disabled': (model: any, formState: any, field: FormlyFieldConfig) => {
    // access to the main model can be through `this.model` or `formState` or `model
    return !formState.mainModel.name
  }
}
})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('appointmentStatusId', { label: 'Appointment Status Id' }, {className: 'w-1/4  px-1', hide: true}),
WebUiFormField.date('appointmentDateAndTime', { label: 'Appointment Date And Time' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('locationName', { label: 'Location Name' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('line1', { label: 'Line 1' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('city', { label: 'City' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'w-1/4  px-1'}),
WebUiFormField.checkbox('checkedIn', { label: 'Checked In' }, { className: 'w-1/4  p-3' })				])
,
				WebUiFormField.fieldRow([
WebUiFormField.date('checkedInDateTime', { label: 'Checked In Date Time' }, {className: 'w-1/4  px-1'}),
WebUiFormField.number('latitude', { label: 'Latitude' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.number('longitude', { label: 'Longitude' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('medicalReportUrl', { label: 'Medical Report Url' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('billUrl', { label: 'Bill Url' }, {className: 'w-1/4  px-1'}),
WebUiFormField.number('duration', { label: 'Duration' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('patientId', { label: 'Patient Id' }, {className: 'w-1/4  px-1', hide: true}),
WebUiFormField.grid('calendars', { label: 'Calendars' } )				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('legalCaseId', { label: 'Legal Case Id' }, {className: 'w-1/4  px-1', hide: true}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('recurringEventNumber', { label: 'Recurring Event Number' }, {className: 'w-1/4  px-1'}),
WebUiFormField.checkbox('isFirstInstance', { label: 'Is First Instance' }, { className: 'w-1/4  p-3' })				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('description', { label: 'Description' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('start', { label: 'Start' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('end', { label: 'End' }, {className: 'w-1/4  px-1'}),
WebUiFormField.checkbox('allDay', { label: 'All Day' }, { className: 'w-1/4  p-3' })				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('recurrence', { label: 'Recurrence' }, {className: 'w-1/4  px-1'}),
WebUiFormField.grid('tasks', { label: 'Tasks' } )				])
]


  submit({
name,appointmentStatusId,appointmentDateAndTime,locationName,line1,city,state,postalCode,checkedIn,checkedInDateTime,latitude,longitude,medicalReportUrl,billUrl,duration,patientId,legalCaseId,notes,recurringEventNumber,isFirstInstance,description,start,end,allDay,recurrence
  }) {
    this.send.emit({
name,appointmentStatusId,appointmentDateAndTime,locationName,line1,city,state,postalCode,checkedIn,checkedInDateTime,latitude,longitude,medicalReportUrl,billUrl,duration,patientId,legalCaseId,notes,recurringEventNumber,isFirstInstance,description,start,end,allDay,recurrence
    })
  }

handleDiscardClick(event) { }
}
