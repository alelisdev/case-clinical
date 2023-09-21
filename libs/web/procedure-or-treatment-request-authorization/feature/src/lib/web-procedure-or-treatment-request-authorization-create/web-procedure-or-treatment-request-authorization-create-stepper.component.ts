
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Authorization,ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { WebProcedureOrTreatmentRequestAuthorizationCreateStore } from './web-procedure-or-treatment-request-authorization-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-procedure-or-treatment-request-authorization-create.component.html',
  providers: [WebProcedureOrTreatmentRequestAuthorizationCreateStore],
})
export class WebProcedureOrTreatmentRequestAuthorizationCreateComponent {
    readonly vm$ = this.store.vm$
    readonly authorizations$ = this.store.authorizations$
readonly procedureOrTreatmentRequests$ = this.store.procedureOrTreatmentRequests$

  model:any = {}

parentAuthorizationId: ''
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
          'authorization',
          'authorizationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('authorizationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAuthorizationId = s
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
    private readonly store: WebProcedureOrTreatmentRequestAuthorizationCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createProcedureOrTreatmentRequestAuthorization(input) {

    if(this.parentAuthorizationId != ''){
      input = {...input, authorizationId: this.parentAuthorizationId} 
    }


    if(this.parentProcedureOrTreatmentRequestId != ''){
      input = {...input, procedureOrTreatmentRequestId: this.parentProcedureOrTreatmentRequestId} 
    }


    this.store.createProcedureOrTreatmentRequestAuthorizationEffect(input)
  }
}
