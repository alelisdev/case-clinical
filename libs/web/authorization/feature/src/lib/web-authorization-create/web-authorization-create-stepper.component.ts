
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Vendor,AuthorizationCategory,AuthorizationType,Procedure } from '@case-clinical/web/core/data-access'
import { WebAuthorizationCreateStore } from './web-authorization-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-authorization-create.component.html',
  providers: [WebAuthorizationCreateStore],
})
export class WebAuthorizationCreateComponent {
    readonly vm$ = this.store.vm$
    readonly vendors$ = this.store.vendors$
readonly authorizationCategories$ = this.store.authorizationCategories$
readonly authorizationTypes$ = this.store.authorizationTypes$
readonly procedures$ = this.store.procedures$

  model:any = {}

parentVendorId: ''
parentAuthorizationCategoryId: ''
parentAuthorizationTypeId: ''
parentProcedureId: ''

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
WebUiFormField.input('requestDescription', { label: 'Request Description' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.currency('durationOrQuantity', { label: 'Duration or Quantity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('unit', { label: 'Unit' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('cptCode', { label: 'Cpt Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,

    
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
,

  WebUiFormField.selectForm(
          'authorization-category',
          'authorizationCategoryId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('authorizationCategoryId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAuthorizationCategoryId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'authorization-type',
          'authorizationTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('authorizationTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAuthorizationTypeId = s
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
				])

  ]

  constructor(
    private readonly store: WebAuthorizationCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createAuthorization(input) {

    if(this.parentVendorId != ''){
      input = {...input, vendorId: this.parentVendorId} 
    }


    if(this.parentAuthorizationCategoryId != ''){
      input = {...input, authorizationCategoryId: this.parentAuthorizationCategoryId} 
    }


    if(this.parentAuthorizationTypeId != ''){
      input = {...input, authorizationTypeId: this.parentAuthorizationTypeId} 
    }


    if(this.parentProcedureId != ''){
      input = {...input, procedureId: this.parentProcedureId} 
    }


    this.store.createAuthorizationEffect(input)
  }
}
