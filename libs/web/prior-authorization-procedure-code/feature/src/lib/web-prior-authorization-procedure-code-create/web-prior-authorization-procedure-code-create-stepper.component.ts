
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { CostCategory,Procedure,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationProcedureCodeCreateStore } from './web-prior-authorization-procedure-code-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prior-authorization-procedure-code-create.component.html',
  providers: [WebPriorAuthorizationProcedureCodeCreateStore],
})
export class WebPriorAuthorizationProcedureCodeCreateComponent {
    readonly vm$ = this.store.vm$
    readonly costCategories$ = this.store.costCategories$
readonly procedures$ = this.store.procedures$
readonly priorAuthorizationRequests$ = this.store.priorAuthorizationRequests$

  model:any = {}

parentCostCategoryId: ''
parentProcedureId: ''
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
}),
WebUiFormField.currency('estimatedCost', { label: 'Estimated Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'cost-category',
          'costCategoryId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('costCategoryId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCostCategoryId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'procedure',
          'procedureId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('procedureId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureId = s
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
    private readonly store: WebPriorAuthorizationProcedureCodeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPriorAuthorizationProcedureCode(input) {

    if(this.parentCostCategoryId != ''){
      input = {...input, costCategoryId: this.parentCostCategoryId} 
    }


    if(this.parentProcedureId != ''){
      input = {...input, procedureId: this.parentProcedureId} 
    }


    if(this.parentPriorAuthorizationRequestId != ''){
      input = {...input, priorAuthorizationRequestId: this.parentPriorAuthorizationRequestId} 
    }


    this.store.createPriorAuthorizationProcedureCodeEffect(input)
  }
}
