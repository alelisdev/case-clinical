
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { DiagnosisCode,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationDiagnosisCodeCreateStore } from './web-prior-authorization-diagnosis-code-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prior-authorization-diagnosis-code-create.component.html',
  providers: [WebPriorAuthorizationDiagnosisCodeCreateStore],
})
export class WebPriorAuthorizationDiagnosisCodeCreateComponent {
    readonly vm$ = this.store.vm$
    readonly diagnosisCodes$ = this.store.diagnosisCodes$
readonly priorAuthorizationRequests$ = this.store.priorAuthorizationRequests$

  model:any = {}

parentDiagnosisCodeId: ''
parentPriorAuthorizationRequestId: ''

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
          'prior-authorization-request',
          'priorAuthorizationRequestId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('priorAuthorizationRequestId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPriorAuthorizationRequestId = s
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
    private readonly store: WebPriorAuthorizationDiagnosisCodeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPriorAuthorizationDiagnosisCode(input) {

    if(this.parentDiagnosisCodeId != ''){
      input = {...input, diagnosisCodeId: this.parentDiagnosisCodeId} 
    }


    if(this.parentPriorAuthorizationRequestId != ''){
      input = {...input, priorAuthorizationRequestId: this.parentPriorAuthorizationRequestId} 
    }


    this.store.createPriorAuthorizationDiagnosisCodeEffect(input)
  }
}
