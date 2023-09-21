
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { AccidentType,LeadStatus,LeadSource,User } from '@case-clinical/web/core/data-access'
import { WebLeadCreateStore } from './web-lead-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-lead-create.component.html',
  providers: [WebLeadCreateStore],
})
export class WebLeadCreateComponent {
    readonly vm$ = this.store.vm$
    readonly accidentTypes$ = this.store.accidentTypes$
readonly documents$ = this.store.documents$
readonly leadStatuses$ = this.store.leadStatuses$
readonly leadSources$ = this.store.leadSources$
readonly users$ = this.store.users$

  model:any = {}

parentAccidentTypeId: ''
parentDriversLicenseId: ''
parentPoliceReportAttachmentId: ''
parentPhoneRecordingId: ''
parentLeadStatusId: ''
parentLeadSourceId: ''
parentSubmittedById: ''

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
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('middleName', { label: 'Middle Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('address', { label: 'Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date of Birth' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfLoss', { label: 'Date of Loss' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfRetention', { label: 'Date of Retention' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('phoneNumber', { label: 'Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('emailAddress', { label: 'Email Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('priorRepresentation', { label: 'Prior Representation' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('driversLicenseNumber', { label: 'Drivers License Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('driversLicenseState', { label: 'Drivers License State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('severeInjury', { label: 'Severe Injury' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('emergencyContactId', { label: 'Emergency Contact Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.checkbox('allowedToContactEmergencyContact', { label: 'Allowed to Contact Emergency Contact' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('policeReport', { label: 'Police Report' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('leadSpecialistId', { label: 'Lead Specialist Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('legalCaseId', { label: 'Legal Case Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
    
  WebUiFormField.selectForm(
          'accident-type',
          'accidentTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('accidentTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAccidentTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.file(
      'driversLicense',
      {
        label: 'Drivers License',
        delete: (d) => {
          this.model.driversLicense = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.driversLicense = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.file(
      'policeReportAttachment',
      {
        label: 'Police Report Attachment',
        delete: (d) => {
          this.model.policeReportAttachment = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.policeReportAttachment = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.file(
      'phoneRecording',
      {
        label: 'Phone Recording',
        delete: (d) => {
          this.model.phoneRecording = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.phoneRecording = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.selectForm(
          'lead-status',
          'leadStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('leadStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLeadStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'lead-source',
          'leadSourceId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('leadSourceId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLeadSourceId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'user',
          'submittedById',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('submittedById')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentSubmittedById = s
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
    private readonly store: WebLeadCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createLead(input) {

    if(this.parentAccidentTypeId != ''){
      input = {...input, accidentTypeId: this.parentAccidentTypeId} 
    }


    if(this.parentDriversLicenseId != ''){
      input = {...input, driversLicenseId: this.parentDriversLicenseId} 
    }


    if(this.parentPoliceReportAttachmentId != ''){
      input = {...input, policeReportAttachmentId: this.parentPoliceReportAttachmentId} 
    }


    if(this.parentPhoneRecordingId != ''){
      input = {...input, phoneRecordingId: this.parentPhoneRecordingId} 
    }


    if(this.parentLeadStatusId != ''){
      input = {...input, leadStatusId: this.parentLeadStatusId} 
    }


    if(this.parentLeadSourceId != ''){
      input = {...input, leadSourceId: this.parentLeadSourceId} 
    }


    if(this.parentSubmittedById != ''){
      input = {...input, submittedById: this.parentSubmittedById} 
    }


    this.store.createLeadEffect(input)
  }
}
