
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebLegalCaseFormStore } from './web-legal-case-form.store'
import { LegalCase,AccidentType,Patient,Firm,Attorney,User,CaseStatus,CaseType,PatientTreatmentStatus,CaseProgressStatus,AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-legal-case-form',
  providers: [WebLegalCaseFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Legal Case"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(legalCase))" [model]="legalCase" [fields]="fields" [form]="form">
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
export class WebFormsUiLegalCaseComponent
    {
  @Input() legalCase: LegalCase = {}
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
          'accidentTypeId',
          {
            label: 'Accident Type',
            options: this.store
                .filterAccidentTypes('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('accidentTypeId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.accidentTypeId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'patientId',
          {
            label: 'Patient',
            options: this.store
                .filterPatients('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('patientId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.patientId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'firmId',
          {
            label: 'Firm',
            options: this.store
                .filterFirms('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('firmId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.firmId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'attorneyId',
          {
            label: 'Attorney',
            options: this.store
                .filterAttorneys('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('attorneyId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.attorneyId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'agentId',
          {
            label: 'Agent',
            options: this.store
                .filterUsers('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('agentId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.agentId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'caseStatusId',
          {
            label: 'Case Status',
            options: this.store
                .filterCaseStatuses('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('caseStatusId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.caseStatusId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'caseTypeId',
          {
            label: 'Case Type',
            options: this.store
                .filterCaseTypes('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('caseTypeId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.caseTypeId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'patientTreatmentStatusId',
          {
            label: 'Patient Treatment Status',
            options: this.store
                .filterPatientTreatmentStatuses('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('patientTreatmentStatusId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.patientTreatmentStatusId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'caseProgressStatusId',
          {
            label: 'Case Progress Status',
            options: this.store
                .filterCaseProgressStatuses('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('caseProgressStatusId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.caseProgressStatusId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'adverseInsuranceStatusId',
          {
            label: 'Adverse Insurance Status',
            options: this.store
                .filterAdverseInsuranceStatuses('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('adverseInsuranceStatusId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.adverseInsuranceStatusId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),

WebUiFormField.input('id', { label: 'Id' }, {className: 'w-full  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.date('dateOfLoss', { label: 'Date Of Loss' }, {className: 'w-full  px-1'}),
WebUiFormField.date('caseStatusDate', { label: 'Case Status Date' }, {className: 'w-full  px-1'}),
WebUiFormField.input('caseStatusOther', { label: 'Case Status Other' }, {className: 'w-full  px-1'}),
WebUiFormField.input('paralegal', { label: 'Paralegal' }, {className: 'w-full  px-1'}),
WebUiFormField.input('paralegalContact', { label: 'Paralegal Contact' }, {className: 'w-full  px-1'}),
WebUiFormField.input('caseNoteSummary', { label: 'Case Note Summary' }, {className: 'w-full  px-1'}),
WebUiFormField.number('policyLimit', { label: 'Policy Limit' }, {className: 'w-full  px-1'}),
WebUiFormField.number('attorneyFee', { label: 'Attorney Fee' }, {className: 'w-full  px-1'}),
WebUiFormField.input('referringPhysician', { label: 'Referring Physician' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('noMoreTreatment', { label: 'No More Treatment' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('medpay', { label: 'Medpay' }, { className: 'w-1/4  p-3' }),
WebUiFormField.input('fileNumber', { label: 'File Number' }, {className: 'w-full  px-1'}),
WebUiFormField.input('caseNumber', { label: 'Case Number' }, {className: 'w-full  px-1'}),
WebUiFormField.input('accidentState', { label: 'Accident State' }, {className: 'w-full  px-1'}),
WebUiFormField.input('assignedTo', { label: 'Assigned To' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('attorneyPaid', { label: 'Attorney Paid' }, { className: 'w-1/4  p-3' }),
WebUiFormField.date('attorneySentDate', { label: 'Attorney Sent Date' }, {className: 'w-full  px-1'}),
WebUiFormField.checkbox('writeOff', { label: 'Write Off' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('noMRI', { label: 'No MRI' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('noPT', { label: 'No PT' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('noFirstAppointment', { label: 'No First Appointment' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('hot', { label: 'Hot' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('documentsUploaded', { label: 'Documents Uploaded' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('attorneyReview', { label: 'Attorney Review' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('escalatedReview', { label: 'Escalated Review' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('inActive', { label: 'In Active' }, { className: 'w-1/4  p-3' }),
WebUiFormField.checkbox('criteria1712', { label: 'Criteria 1712' }, { className: 'w-1/4  p-3' }),
WebUiFormField.date('documentUploadedDate', { label: 'Document Uploaded Date' }, {className: 'w-full  px-1'}),
WebUiFormField.date('patientDischargedGatheringRecordsDate', { label: 'Patient Discharged Gathering Records Date' }, {className: 'w-full  px-1'}),
WebUiFormField.date('resubmitted', { label: 'Resubmitted' }, {className: 'w-full  px-1'}),
WebUiFormField.input('firmCaseManager', { label: 'Firm Case Manager' }, {className: 'w-full  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created By' }, {className: 'w-full  px-1'}),
WebUiFormField.date('renegotiatePayOffDate', { label: 'Renegotiate Pay Off Date' }, {className: 'w-full  px-1'}),
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
    private readonly store: WebLegalCaseFormStore,
  ) {}

  submit({
name,accidentTypeId,patientId,firmId,attorneyId,agentId,caseStatusId,caseTypeId,patientTreatmentStatusId,dateOfLoss,caseStatusDate,caseStatusOther,paralegal,paralegalContact,caseNoteSummary,policyLimit,attorneyFee,referringPhysician,noMoreTreatment,medpay,fileNumber,caseNumber,accidentState,assignedTo,attorneyPaid,attorneySentDate,writeOff,noMRI,noPT,noFirstAppointment,hot,documentsUploaded,attorneyReview,escalatedReview,inActive,criteria1712,documentUploadedDate,patientDischargedGatheringRecordsDate,resubmitted,caseProgressStatusId,firmCaseManager,adverseInsuranceStatusId,createdBy,renegotiatePayOffDate
  }) {
    this.send.emit({
name,accidentTypeId,patientId,firmId,attorneyId,agentId,caseStatusId,caseTypeId,patientTreatmentStatusId,dateOfLoss,caseStatusDate,caseStatusOther,paralegal,paralegalContact,caseNoteSummary,policyLimit,attorneyFee,referringPhysician,noMoreTreatment,medpay,fileNumber,caseNumber,accidentState,assignedTo,attorneyPaid,attorneySentDate,writeOff,noMRI,noPT,noFirstAppointment,hot,documentsUploaded,attorneyReview,escalatedReview,inActive,criteria1712,documentUploadedDate,patientDischargedGatheringRecordsDate,resubmitted,caseProgressStatusId,firmCaseManager,adverseInsuranceStatusId,createdBy,renegotiatePayOffDate
    })
  }

handleDiscardClick(event) { }
}
