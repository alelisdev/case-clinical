
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Organization,Template,Vendor,ReconciliationPeriodType,CalculationBasisType,Process } from '@case-clinical/web/core/data-access'
import { WebContractCreateStore } from './web-contract-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contract-create.component.html',
  providers: [WebContractCreateStore],
})
export class WebContractCreateComponent {
    readonly vm$ = this.store.vm$
    readonly organizations$ = this.store.organizations$
readonly templates$ = this.store.templates$
readonly vendors$ = this.store.vendors$
readonly reconciliationPeriodTypes$ = this.store.reconciliationPeriodTypes$
readonly calculationBasisTypes$ = this.store.calculationBasisTypes$
readonly processes$ = this.store.processes$

  model:any = {}

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
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.checkbox('billOnBehalf', { label: 'Bill on Behalf' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('billRate', { label: 'Bill Rate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('contractDate', { label: 'Contract Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('maturityDate', { label: 'Maturity Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('requiresTpaMedicalNecessity', { label: 'Requires Tpa Medical Necessity' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('requiresTpaMedicareAllowable', { label: 'Requires Tpa Medicare Allowable' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('signed', { label: 'Signed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
,
,
,
,

    
  WebUiFormField.selectForm(
          'organization',
          'organizationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          'reconciliation-period-type',
          'reconciliationPeriodTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebContractCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContract(input) {

    if(this.parentOrganizationId != ''){
      input = {...input, organizationId: this.parentOrganizationId} 
    }


    if(this.parentBillingOrganizationId != ''){
      input = {...input, billingOrganizationId: this.parentBillingOrganizationId} 
    }


    if(this.parentTemplateId != ''){
      input = {...input, templateId: this.parentTemplateId} 
    }


    if(this.parentVendorId != ''){
      input = {...input, vendorId: this.parentVendorId} 
    }


    if(this.parentReconciliationPeriodTypeId != ''){
      input = {...input, reconciliationPeriodTypeId: this.parentReconciliationPeriodTypeId} 
    }


    if(this.parentCalculationBasisTypeId != ''){
      input = {...input, calculationBasisTypeId: this.parentCalculationBasisTypeId} 
    }


    if(this.parentProcessId != ''){
      input = {...input, processId: this.parentProcessId} 
    }


    this.store.createContractEffect(input)
  }
}
