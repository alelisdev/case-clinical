
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { DiagnosisCode,ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { WebProcedureOrTreatmentRequestDiagnosisCodeCreateStore } from './web-procedure-or-treatment-request-diagnosis-code-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-procedure-or-treatment-request-diagnosis-code-create.component.html',
  providers: [WebProcedureOrTreatmentRequestDiagnosisCodeCreateStore],
})
export class WebProcedureOrTreatmentRequestDiagnosisCodeCreateComponent {
    readonly vm$ = this.store.vm$
    readonly diagnosisCodes$ = this.store.diagnosisCodes$
readonly procedureOrTreatmentRequests$ = this.store.procedureOrTreatmentRequests$

  model:any = {}

parentDiagnosisCodeId: ''
parentProcedureOrTreatmentRequestId: ''

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
})
    
  WebUiFormField.selectForm(
          'diagnosis-code',
          'diagnosisCodeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('diagnosisCodeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentDiagnosisCodeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'procedure-or-treatment-request',
          'procedureOrTreatmentRequestId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('procedureOrTreatmentRequestId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureOrTreatmentRequestId = s
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
    private readonly store: WebProcedureOrTreatmentRequestDiagnosisCodeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createProcedureOrTreatmentRequestDiagnosisCode(input) {

    if(this.parentDiagnosisCodeId != ''){
      input = {...input, diagnosisCodeId: this.parentDiagnosisCodeId} 
    }


    if(this.parentProcedureOrTreatmentRequestId != ''){
      input = {...input, procedureOrTreatmentRequestId: this.parentProcedureOrTreatmentRequestId} 
    }


    this.store.createProcedureOrTreatmentRequestDiagnosisCodeEffect(input)
  }
}
