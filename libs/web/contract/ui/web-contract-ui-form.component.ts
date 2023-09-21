
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebContractFormStore } from './web-contract-form.store'
import { Contract,Organization,Template,Vendor,ReconciliationPeriodType,CalculationBasisType,Process } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-contract-form',
  providers: [WebContractFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(contract))" [model]="contract ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiContractComponent
    {
  @Input() contract: Contract = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentOrganizationId: ''
parentBillingOrganizationId: ''
parentTemplateId: ''
parentVendorId: ''
parentReconciliationPeriodTypeId: ''
parentCalculationBasisTypeId: ''
parentProcessId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'organization',
          'organizationId',
        {
          defaultValues: {}, ////Set Parent Values
          createOrganization: (event) => {
            if(event?.name) {
              this.store.addOrganization(event)
              this.model.organizationId = event.id
              this.form.controls['organizationId'].patchValue(event.id)
              this.form.controls['organizationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterOrganizations('').subscribe((values) => {
              this.model.organizationId = selected?.id
              this.form.controls['organizationId'].patchValue(selected?.id)
              this.form.controls['organizationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Organization',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterOrganizations,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterOrganizations('').subscribe()
              this.route.params.pipe(pluck('organizationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentOrganizationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'organization',
          'billingOrganizationId',
        {
          defaultValues: {}, ////Set Parent Values
          createOrganization: (event) => {
            if(event?.name) {
              this.store.addOrganization(event)
              this.model.billingOrganizationId = event.id
              this.form.controls['billingOrganizationId'].patchValue(event.id)
              this.form.controls['billingOrganizationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterOrganizations('').subscribe((values) => {
              this.model.billingOrganizationId = selected?.id
              this.form.controls['billingOrganizationId'].patchValue(selected?.id)
              this.form.controls['billingOrganizationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Billing Organization',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterOrganizations,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterOrganizations('').subscribe()
              this.route.params.pipe(pluck('billingOrganizationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentBillingOrganizationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'template',
          'templateId',
        {
          defaultValues: {}, ////Set Parent Values
          createTemplate: (event) => {
            if(event?.name) {
              this.store.addTemplate(event)
              this.model.templateId = event.id
              this.form.controls['templateId'].patchValue(event.id)
              this.form.controls['templateId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterTemplates('').subscribe((values) => {
              this.model.templateId = selected?.id
              this.form.controls['templateId'].patchValue(selected?.id)
              this.form.controls['templateId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Template',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterTemplates,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterTemplates('').subscribe()
              this.route.params.pipe(pluck('templateId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTemplateId = s
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

  WebUiFormField.selectForm(
          'reconciliation-period-type',
          'reconciliationPeriodTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createReconciliationPeriodType: (event) => {
            if(event?.name) {
              this.store.addReconciliationPeriodType(event)
              this.model.reconciliationPeriodTypeId = event.id
              this.form.controls['reconciliationPeriodTypeId'].patchValue(event.id)
              this.form.controls['reconciliationPeriodTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterReconciliationPeriodTypes('').subscribe((values) => {
              this.model.reconciliationPeriodTypeId = selected?.id
              this.form.controls['reconciliationPeriodTypeId'].patchValue(selected?.id)
              this.form.controls['reconciliationPeriodTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Reconciliation Period Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterReconciliationPeriodTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterReconciliationPeriodTypes('').subscribe()
              this.route.params.pipe(pluck('reconciliationPeriodTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentReconciliationPeriodTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'calculation-basis-type',
          'calculationBasisTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createCalculationBasisType: (event) => {
            if(event?.name) {
              this.store.addCalculationBasisType(event)
              this.model.calculationBasisTypeId = event.id
              this.form.controls['calculationBasisTypeId'].patchValue(event.id)
              this.form.controls['calculationBasisTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterCalculationBasisTypes('').subscribe((values) => {
              this.model.calculationBasisTypeId = selected?.id
              this.form.controls['calculationBasisTypeId'].patchValue(selected?.id)
              this.form.controls['calculationBasisTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Calculation Basis Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterCalculationBasisTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterCalculationBasisTypes('').subscribe()
              this.route.params.pipe(pluck('calculationBasisTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCalculationBasisTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'process',
          'processId',
        {
          defaultValues: {}, ////Set Parent Values
          createProcess: (event) => {
            if(event?.name) {
              this.store.addProcess(event)
              this.model.processId = event.id
              this.form.controls['processId'].patchValue(event.id)
              this.form.controls['processId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterProcesses('').subscribe((values) => {
              this.model.processId = selected?.id
              this.form.controls['processId'].patchValue(selected?.id)
              this.form.controls['processId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Process',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterProcesses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterProcesses('').subscribe()
              this.route.params.pipe(pluck('processId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcessId = s
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
WebUiFormField.checkbox('billOnBehalf', { label: 'Bill On Behalf' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('billRate', { label: 'Bill Rate' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('contractDate', { label: 'Contract Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('maturityDate', { label: 'Maturity Date' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('requiresTpaMedicalNecessity', { label: 'Requires Tpa Medical Necessity' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('requiresTpaMedicareAllowable', { label: 'Requires Tpa Medicare Allowable' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('signed', { label: 'Signed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
,
,
,
				])

]

  constructor(
    private readonly store: WebContractFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,organizationId,billingOrganizationId,templateId,billOnBehalf,billRate,vendorId,contractDate,maturityDate,requiresTpaMedicalNecessity,requiresTpaMedicareAllowable,reconciliationPeriodTypeId,calculationBasisTypeId,signed,processId }) {
    
    if(this.parentOrganizationId != ''){
      organizationId = this.parentOrganizationId
    }


    if(this.parentBillingOrganizationId != ''){
      billingOrganizationId = this.parentBillingOrganizationId
    }


    if(this.parentTemplateId != ''){
      templateId = this.parentTemplateId
    }


    if(this.parentVendorId != ''){
      vendorId = this.parentVendorId
    }


    if(this.parentReconciliationPeriodTypeId != ''){
      reconciliationPeriodTypeId = this.parentReconciliationPeriodTypeId
    }


    if(this.parentCalculationBasisTypeId != ''){
      calculationBasisTypeId = this.parentCalculationBasisTypeId
    }


    if(this.parentProcessId != ''){
      processId = this.parentProcessId
    }

    await this.store.createContractEffect({ name,organizationId,billingOrganizationId,templateId,billOnBehalf,billRate,vendorId,contractDate,maturityDate,requiresTpaMedicalNecessity,requiresTpaMedicareAllowable,reconciliationPeriodTypeId,calculationBasisTypeId,signed,processId })

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
