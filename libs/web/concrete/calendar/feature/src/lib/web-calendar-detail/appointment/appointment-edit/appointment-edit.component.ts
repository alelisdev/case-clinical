
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateAppointmentInput, Role } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { AppointmentEditStore } from './appointment-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  templateUrl: './appointment-edit.component.html',
  providers: [AppointmentEditStore],
})
export class AppointmentEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        readonly appointmentStatuses$ = this.store.appointmentStatuses$
readonly patients$ = this.store.patients$
readonly legalCases$ = this.store.legalCases$

  model: UserUpdateAppointmentInput  = {}

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
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
,
    
    WebUiFormField.typeahead('appointmentStatus', {
      label: 'Appointment Status',
      source: this.store.filterAppointmentStatuses,
      compareWith: (item, selected) => {
        return item.id === selected.id
      },
      changed: (e) => {
        console.log(e)
      },
      onChange: (selected) => {
        console.log(selected)
      }},
      {
        className: 'w-1/2  px-1',
      })
,

    WebUiFormField.typeahead('patient', {
      label: 'Patient',
      source: this.store.filterPatients,
      compareWith: (item, selected) => {
        return item.id === selected.id
      },
      changed: (e) => {
        console.log(e)
      },
      onChange: (selected) => {
        console.log(selected)
      }},
      {
        className: 'w-1/2  px-1',
      })
,

    WebUiFormField.typeahead('legalCase', {
      label: 'Legal Case',
      source: this.store.filterLegalCases,
      compareWith: (item, selected) => {
        return item.id === selected.id
      },
      changed: (e) => {
        console.log(e)
      },
      onChange: (selected) => {
        console.log(selected)
      }},
      {
        className: 'w-1/2  px-1',
      })

  ]

  constructor(
    private readonly store: AppointmentEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateAppointment(input: UserUpdateAppointmentInput) {
     const { name,appointmentDateAndTime,locationName,line1,city,state,postalCode,checkedIn,checkedInDateTime,latitude,longitude,medicalReportUrl,billUrl,duration,notes,recurringEventNumber,isFirstInstance,description,start,end,allDay,recurrence, appointmentStatus,patient,legalCase } = input
        
         var appointmentStatusId = appointmentStatus?.id
    var patientId = patient?.id
    var legalCaseId = legalCase?.id     

     this.store.updateAppointmentEffect({name,appointmentStatusId,appointmentDateAndTime,locationName,line1,city,state,postalCode,checkedIn,checkedInDateTime,latitude,longitude,medicalReportUrl,billUrl,duration,patientId,legalCaseId,notes,recurringEventNumber,isFirstInstance,description,start,end,allDay,recurrence})
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
