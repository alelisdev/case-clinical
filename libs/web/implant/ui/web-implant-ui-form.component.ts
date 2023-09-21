
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebImplantFormStore } from './web-implant-form.store'
import { Implant,ImplantCategory,Contact,Manufacturer } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-implant-form',
  providers: [WebImplantFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(implant))" [model]="implant ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiImplantComponent
    {
  @Input() implant: Implant = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

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

  WebUiFormField.selectForm(
          'implant-category',
          'implantCategoryId',
        {
          defaultValues: {}, ////Set Parent Values
          createImplantCategory: (event) => {
            if(event?.name) {
              this.store.addImplantCategory(event)
              this.model.implantCategoryId = event.id
              this.form.controls['implantCategoryId'].patchValue(event.id)
              this.form.controls['implantCategoryId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterImplantCategories('').subscribe((values) => {
              this.model.implantCategoryId = selected?.id
              this.form.controls['implantCategoryId'].patchValue(selected?.id)
              this.form.controls['implantCategoryId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Implant Category',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterImplantCategories,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterImplantCategories('').subscribe()
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
          createContact: (event) => {
            if(event?.name) {
              this.store.addContact(event)
              this.model.salesRepresentativeId = event.id
              this.form.controls['salesRepresentativeId'].patchValue(event.id)
              this.form.controls['salesRepresentativeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterContacts('').subscribe((values) => {
              this.model.salesRepresentativeId = selected?.id
              this.form.controls['salesRepresentativeId'].patchValue(selected?.id)
              this.form.controls['salesRepresentativeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Sales Representative',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterContacts,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterContacts('').subscribe()
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
          createManufacturer: (event) => {
            if(event?.name) {
              this.store.addManufacturer(event)
              this.model.manufacturerId = event.id
              this.form.controls['manufacturerId'].patchValue(event.id)
              this.form.controls['manufacturerId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterManufacturers('').subscribe((values) => {
              this.model.manufacturerId = selected?.id
              this.form.controls['manufacturerId'].patchValue(selected?.id)
              this.form.controls['manufacturerId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Manufacturer',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterManufacturers,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterManufacturers('').subscribe()
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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.currency('estimatedCost', { label: 'Estimated Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('photoUrl', { label: 'Photo Url' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('sku', { label: 'Sku' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
				])

]

  constructor(
    private readonly store: WebImplantFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,estimatedCost,implantCategoryId,manufacturerId,photoUrl,salesRepresentativeId,sku }) {
    
    if(this.parentImplantCategoryId != ''){
      implantCategoryId = this.parentImplantCategoryId
    }


    if(this.parentSalesRepresentativeId != ''){
      salesRepresentativeId = this.parentSalesRepresentativeId
    }


    if(this.parentManufacturerId != ''){
      manufacturerId = this.parentManufacturerId
    }

    await this.store.createImplantEffect({ name,estimatedCost,implantCategoryId,manufacturerId,photoUrl,salesRepresentativeId,sku })

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
