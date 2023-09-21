
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Vendor } from '@case-clinical/web/core/data-access'
import { WebDurableMedicalEquipmentCreateStore } from './web-durable-medical-equipment-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-durable-medical-equipment-create.component.html',
  providers: [WebDurableMedicalEquipmentCreateStore],
})
export class WebDurableMedicalEquipmentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly vendors$ = this.store.vendors$

  model:any = {}

parentVendorId: ''

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
WebUiFormField.input('itemCode', { label: 'Item Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('size', { label: 'Size' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('brand', { label: 'Brand' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('itemURL', { label: 'Item URL' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('estimatedCost', { label: 'Estimated Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'vendor',
          'vendorId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('vendorId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentVendorId = s
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
    private readonly store: WebDurableMedicalEquipmentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createDurableMedicalEquipment(input) {

    if(this.parentVendorId != ''){
      input = {...input, vendorId: this.parentVendorId} 
    }


    this.store.createDurableMedicalEquipmentEffect(input)
  }
}
