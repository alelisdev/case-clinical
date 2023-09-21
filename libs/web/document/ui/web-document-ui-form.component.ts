
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebDocumentFormStore } from './web-document-form.store'
import { Document,Contract,Patient,Prescription,User,PatientStudy,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-document-form',
  providers: [WebDocumentFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Document"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(document))" [model]="document" [fields]="fields" [form]="form">
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
export class WebFormsUiDocumentComponent
    {
  @Input() document: Document = {}
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
          'contractId',
          {
            label: 'Contract',
            options: this.store
                .filterContracts('')
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
                this.route.params.pipe(pluck('contractId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.contractId = s
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
          'prescriptionId',
          {
            label: 'Prescription',
            options: this.store
                .filterPrescriptions('')
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
                this.route.params.pipe(pluck('prescriptionId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.prescriptionId = s
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
          'providerId',
          {
            label: 'Provider',
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
                this.route.params.pipe(pluck('providerId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.providerId = s
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
          'patientStudyId',
          {
            label: 'Patient Studies',
            options: this.store
                .filterPatientStudies('')
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
                this.route.params.pipe(pluck('patientStudyId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.patientStudyId = s
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
          'procedureVendorId',
          {
            label: 'Procedure Vendor',
            options: this.store
                .filterProcedureVendors('')
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
                this.route.params.pipe(pluck('procedureVendorId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.procedureVendorId = s
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
WebUiFormField.input('attachment', { label: 'Attachment' }, {className: 'w-full  px-1'}),
WebUiFormField.input('encoding', { label: 'Encoding' }, {className: 'w-full  px-1'}),
WebUiFormField.input('extension', { label: 'Extension' }, {className: 'w-full  px-1'}),
				])

]

  constructor(
    private readonly store: WebDocumentFormStore,
  ) {}

  submit({
name,attachment,encoding,extension,contractId,patientId,prescriptionId,providerId,patientStudyId,procedureVendorId
  }) {
    this.send.emit({
name,attachment,encoding,extension,contractId,patientId,prescriptionId,providerId,patientStudyId,procedureVendorId
    })
  }

handleDiscardClick(event) { }
}
