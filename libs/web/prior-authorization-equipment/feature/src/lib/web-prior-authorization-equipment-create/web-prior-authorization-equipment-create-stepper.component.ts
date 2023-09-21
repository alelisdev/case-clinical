
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Equipment,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationEquipmentCreateStore } from './web-prior-authorization-equipment-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prior-authorization-equipment-create.component.html',
  providers: [WebPriorAuthorizationEquipmentCreateStore],
})
export class WebPriorAuthorizationEquipmentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly equipment$ = this.store.equipment$
readonly priorAuthorizationRequests$ = this.store.priorAuthorizationRequests$

  model:any = {}

parentEquipmentId: ''
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
          'equipment',
          'equipmentId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('equipmentId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentEquipmentId = s
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
    private readonly store: WebPriorAuthorizationEquipmentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPriorAuthorizationEquipment(input) {

    if(this.parentEquipmentId != ''){
      input = {...input, equipmentId: this.parentEquipmentId} 
    }


    if(this.parentPriorAuthorizationRequestId != ''){
      input = {...input, priorAuthorizationRequestId: this.parentPriorAuthorizationRequestId} 
    }


    this.store.createPriorAuthorizationEquipmentEffect(input)
  }
}
