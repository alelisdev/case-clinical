
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Vendor } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderCreateStore } from './web-clinical-provider-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-clinical-provider-create.component.html',
  providers: [WebClinicalProviderCreateStore],
})
export class WebClinicalProviderCreateComponent {
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
WebUiFormField.input('expertId', { label: 'Expert Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('npi', { label: 'Npi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('honorific', { label: 'Honorific' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('suffix', { label: 'Suffix' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('phoneNumber', { label: 'Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('emailAddress', { label: 'Email Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('profilePictureId', { label: 'Profile Picture Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('compressProfilePictureId', { label: 'Compress Profile Picture Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
,
,
,
,
,
,
,
,
WebUiFormField.input('user', { label: 'User' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
    private readonly store: WebClinicalProviderCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createClinicalProvider(input) {

    if(this.parentVendorId != ''){
      input = {...input, vendorId: this.parentVendorId} 
    }


    this.store.createClinicalProviderEffect(input)
  }
}
