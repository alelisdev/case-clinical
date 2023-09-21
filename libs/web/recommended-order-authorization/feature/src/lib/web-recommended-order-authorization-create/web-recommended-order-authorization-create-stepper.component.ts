
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Authorization,RecommendedOrder } from '@case-clinical/web/core/data-access'
import { WebRecommendedOrderAuthorizationCreateStore } from './web-recommended-order-authorization-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-recommended-order-authorization-create.component.html',
  providers: [WebRecommendedOrderAuthorizationCreateStore],
})
export class WebRecommendedOrderAuthorizationCreateComponent {
    readonly vm$ = this.store.vm$
    readonly authorizations$ = this.store.authorizations$
readonly recommendedOrders$ = this.store.recommendedOrders$

  model:any = {}

parentAuthorizationId: ''
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
    private readonly store: WebRecommendedOrderAuthorizationCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRecommendedOrderAuthorization(input) {

    if(this.parentAuthorizationId != ''){
      input = {...input, authorizationId: this.parentAuthorizationId} 
    }


    if(this.parentRecommendedOrderId != ''){
      input = {...input, recommendedOrderId: this.parentRecommendedOrderId} 
    }


    this.store.createRecommendedOrderAuthorizationEffect(input)
  }
}
