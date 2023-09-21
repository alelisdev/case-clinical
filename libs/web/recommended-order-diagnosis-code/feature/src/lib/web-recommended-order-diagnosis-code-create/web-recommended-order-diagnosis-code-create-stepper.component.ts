
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { DiagnosisCode,RecommendedOrder } from '@case-clinical/web/core/data-access'
import { WebRecommendedOrderDiagnosisCodeCreateStore } from './web-recommended-order-diagnosis-code-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-recommended-order-diagnosis-code-create.component.html',
  providers: [WebRecommendedOrderDiagnosisCodeCreateStore],
})
export class WebRecommendedOrderDiagnosisCodeCreateComponent {
    readonly vm$ = this.store.vm$
    readonly diagnosisCodes$ = this.store.diagnosisCodes$
readonly recommendedOrders$ = this.store.recommendedOrders$

  model:any = {}

parentDiagnosisCodeId: ''
parentRecommendedOrderId: ''

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
          'recommended-order',
          'recommendedOrderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('recommendedOrderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentRecommendedOrderId = s
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
    private readonly store: WebRecommendedOrderDiagnosisCodeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRecommendedOrderDiagnosisCode(input) {

    if(this.parentDiagnosisCodeId != ''){
      input = {...input, diagnosisCodeId: this.parentDiagnosisCodeId} 
    }


    if(this.parentRecommendedOrderId != ''){
      input = {...input, recommendedOrderId: this.parentRecommendedOrderId} 
    }


    this.store.createRecommendedOrderDiagnosisCodeEffect(input)
  }
}
