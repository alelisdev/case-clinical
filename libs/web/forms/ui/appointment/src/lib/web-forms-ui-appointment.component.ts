
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Appointment,Location,Facility,Patient,LegalCase,Calendar,AppointmentStatus } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-appointment-form',
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
export class WebFormsUiAppointmentComponent
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
WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.date('appointmentDateAndTime', { label: 'Appointment Date And Time' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('checkedIn', { label: 'Checked In' }, { className: 'w-1/4  p-3' }),
WebUiFormField.date('checkedInDateTime', { label: 'Checked In Date Time' }, {className: 'w-full  px-1'}),
WebUiFormField.input('medicalReportUrl', { label: 'Medical Report Url' }, {className: 'w-full  px-1'}),
WebUiFormField.input('billUrl', { label: 'Bill Url' }, {className: 'w-full  px-1'}),
WebUiFormField.number('duration', { label: 'Duration' }, {className: 'w-full  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'w-full  px-1'}),
WebUiFormField.input('recurringEventId', { label: 'Recurring Event Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.checkbox('isFirstInstance', { label: 'Is First Instance' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('description', { label: 'Description' }, {className: 'w-full  px-1'}),
WebUiFormField.input('start', { label: 'Start' }, {className: 'w-full  px-1'}),
WebUiFormField.input('end', { label: 'End' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('allDay', { label: 'All Day' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('recurrence', { label: 'Recurrence' }, {className: 'w-full  px-1'}),
WebUiFormField.input('surgicalCase', { label: 'Surgical Case' }, {className: 'w-full  px-1'}),
,
]


  submit({
name,appointmentDateAndTime,locationId,facilityId,checkedIn,checkedInDateTime,medicalReportUrl,billUrl,duration,patientId,legalCaseId,calendarId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence,surgicalCase
  }) {
    this.send.emit({
name,appointmentDateAndTime,locationId,facilityId,checkedIn,checkedInDateTime,medicalReportUrl,billUrl,duration,patientId,legalCaseId,calendarId,appointmentStatusId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence,surgicalCase
    })
  }

handleDiscardClick(event) { }
}
