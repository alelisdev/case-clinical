
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebVendorFormStore } from './web-vendor-form.store'
import { Vendor,VendorType } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-vendor-form',
  providers: [WebVendorFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(vendor))" [model]="vendor ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiVendorComponent
    {
  @Input() vendor: Vendor = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentVendorTypeId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'vendor-type',
          'vendorTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createVendorType: (event) => {
            if(event?.name) {
              this.store.addVendorType(event)
              this.model.vendorTypeId = event.id
              this.form.controls['vendorTypeId'].patchValue(event.id)
              this.form.controls['vendorTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterVendorTypes('').subscribe((values) => {
              this.model.vendorTypeId = selected?.id
              this.form.controls['vendorTypeId'].patchValue(selected?.id)
              this.form.controls['vendorTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Vendor Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterVendorTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterVendorTypes('').subscribe()
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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('taxId', { label: 'Tax Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('line1', { label: 'Line 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('emailAddress', { label: 'Email Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('phoneNumber', { label: 'Phone Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('mailingAddress', { label: 'Mailing Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
WebUiFormField.input('line2', { label: 'Line 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('country', { label: 'Country' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('office', { label: 'Office' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('email', { label: 'Email' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('website', { label: 'Website' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('contactPerson', { label: 'Contact Person' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('owner', { label: 'Owner' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('w9', { label: 'W 9' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bankRoutingNumber', { label: 'Bank Routing Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bankAccountNumber', { label: 'Bank Account Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bankName', { label: 'Bank Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bankCity', { label: 'Bank City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bankState', { label: 'Bank State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('bankZip', { label: 'Bank Zip' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billOfSaleTemplate', { label: 'Bill Of Sale Template' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billOfSaleInstructions', { label: 'Bill Of Sale Instructions' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('apDetailTemplate', { label: 'Ap Detail Template' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('agreementDetails', { label: 'Agreement Details' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('dl', { label: 'Dl' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('nci', { label: 'Nci' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('baa', { label: 'Baa' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('ucc', { label: 'Ucc' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('nds', { label: 'Nds' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('contract', { label: 'Contract' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('sa', { label: 'Sa' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('other', { label: 'Other' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('ota', { label: 'Ota' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('permission', { label: 'Permission' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('cellphone', { label: 'Cellphone' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('ach', { label: 'Ach' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('facilityCheck', { label: 'Facility Check' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('wire', { label: 'Wire' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('reductionNotes', { label: 'Reduction Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('latitude', { label: 'Latitude' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('longitude', { label: 'Longitude' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('businessCentralName', { label: 'Business Central Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
				])

]

  constructor(
    private readonly store: WebVendorFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,taxId,line1,city,state,postalCode,emailAddress,phoneNumber,fax,mailingAddress,vendorTypeId,line2,country,office,email,website,contactPerson,owner,w9,bankRoutingNumber,bankAccountNumber,bankName,bankCity,bankState,bankZip,billOfSaleTemplate,billOfSaleInstructions,apDetailTemplate,notes,agreementDetails,dl,nci,baa,ucc,nds,contract,sa,other,ota,permission,cellphone,ach,facilityCheck,wire,reductionNotes,latitude,longitude,businessCentralName }) {
    
    if(this.parentVendorTypeId != ''){
      vendorTypeId = this.parentVendorTypeId
    }

    await this.store.createVendorEffect({ name,taxId,line1,city,state,postalCode,emailAddress,phoneNumber,fax,mailingAddress,vendorTypeId,line2,country,office,email,website,contactPerson,owner,w9,bankRoutingNumber,bankAccountNumber,bankName,bankCity,bankState,bankZip,billOfSaleTemplate,billOfSaleInstructions,apDetailTemplate,notes,agreementDetails,dl,nci,baa,ucc,nds,contract,sa,other,ota,permission,cellphone,ach,facilityCheck,wire,reductionNotes,latitude,longitude,businessCentralName })

    await this.store.item$.pipe(
      tap((item) => {
        if(item) {
          this.send.emit(item)
        }
      })
    ).subscribe()
  }

  handleDiscardClick(event) { 
     this.send.emit(event)
  }
}
