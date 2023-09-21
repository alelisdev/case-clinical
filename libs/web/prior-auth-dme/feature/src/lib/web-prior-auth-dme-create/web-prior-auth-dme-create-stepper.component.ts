
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { WebPriorAuthDmeCreateStore } from './web-prior-auth-dme-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prior-auth-dme-create.component.html',
  providers: [WebPriorAuthDmeCreateStore],
})
export class WebPriorAuthDmeCreateComponent {
    readonly vm$ = this.store.vm$
    readonly priorAuthorizationRequests$ = this.store.priorAuthorizationRequests$
readonly durableMedicalEquipments$ = this.store.durableMedicalEquipments$

  model:any = {}

parentPriorAuthId: ''
parentDurableMedicalEquipmentId: ''

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
          'prior-authorization-request',
          'priorAuthId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('priorAuthId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPriorAuthId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'durable-medical-equipment',
          'durableMedicalEquipmentId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('durableMedicalEquipmentId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentDurableMedicalEquipmentId = s
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
    private readonly store: WebPriorAuthDmeCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPriorAuthDme(input) {

    if(this.parentPriorAuthId != ''){
      input = {...input, priorAuthId: this.parentPriorAuthId} 
    }


    if(this.parentDurableMedicalEquipmentId != ''){
      input = {...input, durableMedicalEquipmentId: this.parentDurableMedicalEquipmentId} 
    }


    this.store.createPriorAuthDmeEffect(input)
  }
}
