
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Location,Patient,ClinicalProvider,LegalCase,AppointmentStatus } from '@case-clinical/web/core/data-access'
import { WebAppointmentCreateStore } from './web-appointment-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-appointment-create.component.html',
  providers: [WebAppointmentCreateStore],
})
export class WebAppointmentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly locations$ = this.store.locations$
readonly patients$ = this.store.patients$

readonly legalCases$ = this.store.legalCases$
readonly appointmentStatuses$ = this.store.appointmentStatuses$
readonly visitKinds$ = this.store.visitKinds$

  model:any = {}

parentLocationId: ''
parentPatientId: ''
parentClinicalProviderId: ''
parentLegalCaseId: ''
parentAppointmentStatusId: ''
parentVisitKindId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.date('appointmentDateAndTime', { label: 'Appointment Date and Time' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('checkedIn', { label: 'Checked in' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('checkedInDateTime', { label: 'Checked in Date Time' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('medicalReportUrl', { label: 'Medical Report Url' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('billUrl', { label: 'Bill Url' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('duration', { label: 'Duration' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('recurringEventId', { label: 'Recurring Event Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.checkbox('isFirstInstance', { label: 'Is First Instance' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('description', { label: 'Description' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('start', { label: 'Start' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('end', { label: 'End' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('allDay', { label: 'All Day' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('recurrence', { label: 'Recurrence' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,

    
  WebUiFormField.selectForm(
          'location',
          'locationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('locationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLocationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'patient',
          'patientId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('patientId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPatientId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'clinical-provider',
          'clinicalProviderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('clinicalProviderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClinicalProviderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('legalCaseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLegalCaseId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'appointment-status',
          'appointmentStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('appointmentStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAppointmentStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    ),
    WebUiFormField.selectForm(
      'visit-kind',
      'visitKindId',
    {
      defaultValues: {}, ////Set Parent Values
      debounceTime: 5
    },
    {
      className: 'w-full md:w-1/2 xl:w-1/4 px-1',
      hooks: {
        onInit: async (field) => {
          this.route.params.pipe(pluck('visitKindId')).subscribe((s) => {

          if (s != undefined || s != null) {
            this.parentVisitKindId = s
            field.hide = true
          }
        })
      },
    }
  }
)
				])

  ]

  constructor(
    private readonly store: WebAppointmentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createAppointment(input) {

    if(this.parentLocationId != ''){
      input = {...input, locationId: this.parentLocationId} 
    }


    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    if(this.parentAppointmentStatusId != ''){
      input = {...input, appointmentStatusId: this.parentAppointmentStatusId} 
    }

    if(this.parentVisitKindId != ''){
      input = {...input, visitKindId: this.parentVisitKindId} 
    }


    this.store.createAppointmentEffect(input)
  }
}
