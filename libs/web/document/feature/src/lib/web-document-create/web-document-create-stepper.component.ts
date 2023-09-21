
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Contract,Patient,Prescription,User,PatientStudy,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { WebDocumentCreateStore } from './web-document-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-document-create.component.html',
  providers: [WebDocumentCreateStore],
})
export class WebDocumentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly contracts$ = this.store.contracts$
readonly patients$ = this.store.patients$
readonly prescriptions$ = this.store.prescriptions$
readonly users$ = this.store.users$
readonly patientStudies$ = this.store.patientStudies$
readonly procedureVendors$ = this.store.procedureVendors$

  model:any = {}

parentContractId: ''
parentPatientId: ''
parentPrescriptionId: ''
parentProviderId: ''
parentPatientStudyId: ''
parentProcedureVendorId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('attachment', { label: 'Attachment' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('encoding', { label: 'Encoding' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('extension', { label: 'Extension' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
,
,
,

    
  WebUiFormField.selectForm(
          'contract',
          'contractId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contractId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContractId = s
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
          'prescription',
          'prescriptionId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('prescriptionId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPrescriptionId = s
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
          'providerId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('providerId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProviderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'patient-study',
          'patientStudyId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('patientStudyId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPatientStudyId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'procedure-vendor',
          'procedureVendorId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('procedureVendorId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureVendorId = s
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
    private readonly store: WebDocumentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createDocument(input) {

    if(this.parentContractId != ''){
      input = {...input, contractId: this.parentContractId} 
    }


    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentPrescriptionId != ''){
      input = {...input, prescriptionId: this.parentPrescriptionId} 
    }


    if(this.parentProviderId != ''){
      input = {...input, providerId: this.parentProviderId} 
    }


    if(this.parentPatientStudyId != ''){
      input = {...input, patientStudyId: this.parentPatientStudyId} 
    }


    if(this.parentProcedureVendorId != ''){
      input = {...input, procedureVendorId: this.parentProcedureVendorId} 
    }


    this.store.createDocumentEffect(input)
  }
}
