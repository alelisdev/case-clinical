
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ImplantCategory,Contact,Manufacturer } from '@case-clinical/web/core/data-access'
import { WebImplantCreateStore } from './web-implant-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-implant-create.component.html',
  providers: [WebImplantCreateStore],
})
export class WebImplantCreateComponent {
    readonly vm$ = this.store.vm$
    readonly implantCategories$ = this.store.implantCategories$
readonly contacts$ = this.store.contacts$
readonly manufacturers$ = this.store.manufacturers$

  model:any = {}

parentImplantCategoryId: ''
parentSalesRepresentativeId: ''
parentManufacturerId: ''

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
WebUiFormField.currency('estimatedCost', { label: 'Estimated Cost' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('photoUrl', { label: 'Photo Url' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('sku', { label: 'Sku' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'implant-category',
          'implantCategoryId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('implantCategoryId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentImplantCategoryId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'contact',
          'salesRepresentativeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('salesRepresentativeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentSalesRepresentativeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'manufacturer',
          'manufacturerId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('manufacturerId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentManufacturerId = s
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
    private readonly store: WebImplantCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createImplant(input) {

    if(this.parentImplantCategoryId != ''){
      input = {...input, implantCategoryId: this.parentImplantCategoryId} 
    }


    if(this.parentSalesRepresentativeId != ''){
      input = {...input, salesRepresentativeId: this.parentSalesRepresentativeId} 
    }


    if(this.parentManufacturerId != ''){
      input = {...input, manufacturerId: this.parentManufacturerId} 
    }


    this.store.createImplantEffect(input)
  }
}
