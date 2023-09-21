
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { AccidentType,Patient,MedLevel,Firm,Attorney,CaseStatus,CaseType,PatientTreatmentStatus,CaseProgressStatus,AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { WebLegalCaseCreateStore } from './web-legal-case-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-legal-case-create.component.html',
  providers: [WebLegalCaseCreateStore],
})
export class WebLegalCaseCreateComponent {
    readonly vm$ = this.store.vm$
    readonly accidentTypes$ = this.store.accidentTypes$
readonly patients$ = this.store.patients$
readonly medLevels$ = this.store.medLevels$
readonly firms$ = this.store.firms$
readonly attorneys$ = this.store.attorneys$
readonly caseStatuses$ = this.store.caseStatuses$
readonly caseTypes$ = this.store.caseTypes$
readonly patientTreatmentStatuses$ = this.store.patientTreatmentStatuses$
readonly caseProgressStatuses$ = this.store.caseProgressStatuses$
readonly adverseInsuranceStatuses$ = this.store.adverseInsuranceStatuses$

  model:any = {}

parentAccidentTypeId: ''
parentPatientId: ''
parentMedLevelId: ''
parentFirmId: ''
parentAttorneyId: ''
parentCaseStatusId: ''
parentCaseTypeId: ''
parentPatientTreatmentStatusId: ''
parentCaseProgressStatusId: ''
parentAdverseInsuranceStatusId: ''

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
WebUiFormField.input('agentId', { label: 'Agent Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('medicalRecordNumber', { label: 'Medical Record Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('pharmacyControlNumber', { label: 'Pharmacy Control Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('pchGroupNumber', { label: 'Pch Group Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfLoss', { label: 'Date of Loss' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('caseStatusDate', { label: 'Case Status Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('caseStatusOther', { label: 'Case Status Other' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('paralegal', { label: 'Paralegal' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('paralegalContact', { label: 'Paralegal Contact' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('caseNoteSummary', { label: 'Case Note Summary' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.currency('policyLimit', { label: 'Policy Limit' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('attorneyFee', { label: 'Attorney Fee' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('referringPhysician', { label: 'Referring Physician' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('noMoreTreatment', { label: 'No More Treatment' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('medpay', { label: 'Medpay' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('fileNumber', { label: 'File Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('caseNumber', { label: 'Case Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('accidentState', { label: 'Accident State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('assignedTo', { label: 'Assigned to' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('attorneyPaid', { label: 'Attorney Paid' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('attorneySentDate', { label: 'Attorney Sent Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('writeOff', { label: 'Write off' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('noMRI', { label: 'No MRI' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('noPT', { label: 'No PT' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('noFirstAppointment', { label: 'No First Appointment' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('hot', { label: 'Hot' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('documentsUploaded', { label: 'Documents Uploaded' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('attorneyReview', { label: 'Attorney Review' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('escalatedReview', { label: 'Escalated Review' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('inActive', { label: 'In Active' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('criteria1712', { label: 'Criteria 1712' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('documentUploadedDate', { label: 'Document Uploaded Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('patientDischargedGatheringRecordsDate', { label: 'Patient Discharged Gathering Records Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('resubmitted', { label: 'Resubmitted' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('firmCaseManager', { label: 'Firm Case Manager' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created by' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('renegotiatePayOffDate', { label: 'Renegotiate Pay off Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,
,
,
,
,
,
,

    
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
          'med-level',
          'medLevelId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('medLevelId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentMedLevelId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'firm',
          'firmId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('firmId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentFirmId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'attorney',
          'attorneyId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('attorneyId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAttorneyId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'case-status',
          'caseStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('caseStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCaseStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'case-type',
          'caseTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('caseTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCaseTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'patient-treatment-status',
          'patientTreatmentStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('patientTreatmentStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPatientTreatmentStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'case-progress-status',
          'caseProgressStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('caseProgressStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCaseProgressStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'adverse-insurance-status',
          'adverseInsuranceStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('adverseInsuranceStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAdverseInsuranceStatusId = s
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
    private readonly store: WebLegalCaseCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createLegalCase(input) {

    if(this.parentAccidentTypeId != ''){
      input = {...input, accidentTypeId: this.parentAccidentTypeId} 
    }


    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentMedLevelId != ''){
      input = {...input, medLevelId: this.parentMedLevelId} 
    }


    if(this.parentFirmId != ''){
      input = {...input, firmId: this.parentFirmId} 
    }


    if(this.parentAttorneyId != ''){
      input = {...input, attorneyId: this.parentAttorneyId} 
    }


    if(this.parentCaseStatusId != ''){
      input = {...input, caseStatusId: this.parentCaseStatusId} 
    }


    if(this.parentCaseTypeId != ''){
      input = {...input, caseTypeId: this.parentCaseTypeId} 
    }


    if(this.parentPatientTreatmentStatusId != ''){
      input = {...input, patientTreatmentStatusId: this.parentPatientTreatmentStatusId} 
    }


    if(this.parentCaseProgressStatusId != ''){
      input = {...input, caseProgressStatusId: this.parentCaseProgressStatusId} 
    }


    if(this.parentAdverseInsuranceStatusId != ''){
      input = {...input, adverseInsuranceStatusId: this.parentAdverseInsuranceStatusId} 
    }


    this.store.createLegalCaseEffect(input)
  }
}
