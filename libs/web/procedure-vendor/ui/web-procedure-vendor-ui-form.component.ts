
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebProcedureVendorFormStore } from './web-procedure-vendor-form.store'
import { ProcedureVendor,CaseProcedure,Vendor } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-vendor-form',
  providers: [WebProcedureVendorFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(procedureVendor))" [model]="procedureVendor ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiProcedureVendorComponent
    {
  @Input() procedureVendor: ProcedureVendor = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentProcedureId: ''
parentVendorId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'case-procedure',
          'procedureId',
        {
          defaultValues: {}, ////Set Parent Values
          createCaseProcedure: (event) => {
            if(event?.name) {
              this.store.addCaseProcedure(event)
              this.model.procedureId = event.id
              this.form.controls['procedureId'].patchValue(event.id)
              this.form.controls['procedureId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterCaseProcedures('').subscribe((values) => {
              this.model.procedureId = selected?.id
              this.form.controls['procedureId'].patchValue(selected?.id)
              this.form.controls['procedureId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Procedure',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterCaseProcedures,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterCaseProcedures('').subscribe()
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
,

  WebUiFormField.selectForm(
          'vendor',
          'vendorId',
        {
          defaultValues: {}, ////Set Parent Values
          createVendor: (event) => {
            if(event?.name) {
              this.store.addVendor(event)
              this.model.vendorId = event.id
              this.form.controls['vendorId'].patchValue(event.id)
              this.form.controls['vendorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterVendors('').subscribe((values) => {
              this.model.vendorId = selected?.id
              this.form.controls['vendorId'].patchValue(selected?.id)
              this.form.controls['vendorId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Vendor',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterVendors,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterVendors('').subscribe()
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
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('contractId', { label: 'Contract Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.currency('estimate', { label: 'Estimate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('fundingApproved', { label: 'Funding Approved' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
				])

]

  constructor(
    private readonly store: WebProcedureVendorFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,procedureId,contractId,vendorId,estimate,fundingApproved }) {
    
    if(this.parentProcedureId != ''){
      procedureId = this.parentProcedureId
    }


    if(this.parentVendorId != ''){
      vendorId = this.parentVendorId
    }

    await this.store.createProcedureVendorEffect({ name,procedureId,contractId,vendorId,estimate,fundingApproved })

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
