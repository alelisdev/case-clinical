
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { VendorType } from '@case-clinical/web/core/data-access'
import { WebVendorCreateStore } from './web-vendor-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-vendor-create.component.html',
  providers: [WebVendorCreateStore],
})
export class WebVendorCreateComponent {
    readonly vm$ = this.store.vm$
    readonly vendorTypes$ = this.store.vendorTypes$

  model:any = {}

parentVendorTypeId: ''

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
WebUiFormField.input('taxId', { label: 'Tax Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('line1', { label: 'Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('emailAddress', { label: 'Email Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('phoneNumber', { label: 'Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('mailingAddress', { label: 'Mailing Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
WebUiFormField.input('line2', { label: 'Line 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('country', { label: 'Country' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('office', { label: 'Office' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('email', { label: 'Email' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('website', { label: 'Website' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('contactPerson', { label: 'Contact Person' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('owner', { label: 'Owner' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bankRoutingNumber', { label: 'Bank Routing Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bankAccountNumber', { label: 'Bank Account Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bankName', { label: 'Bank Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bankCity', { label: 'Bank City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bankState', { label: 'Bank State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bankZip', { label: 'Bank Zip' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('agreementDetails', { label: 'Agreement Details' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('providerSearchNameDisplayType', { label: 'Provider Search Name Display Type' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('driversLicenseId', { label: 'Drivers License Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
,
WebUiFormField.input('logoId', { label: 'Logo Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('cellphone', { label: 'Cellphone' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('achCheckOrWire', { label: 'Ach Check or Wire' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('reductionNotes', { label: 'Reduction Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.currency('latitude', { label: 'Latitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('longitude', { label: 'Longitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('businessCentralName', { label: 'Business Central Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,
,
,

    
  WebUiFormField.selectForm(
          'vendor-type',
          'vendorTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('vendorTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentVendorTypeId = s
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
    private readonly store: WebVendorCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createVendor(input) {

    if(this.parentVendorTypeId != ''){
      input = {...input, vendorTypeId: this.parentVendorTypeId} 
    }


    this.store.createVendorEffect(input)
  }
}
