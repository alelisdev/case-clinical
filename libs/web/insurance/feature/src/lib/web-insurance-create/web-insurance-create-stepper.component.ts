
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { LegalCase,InsuranceType,InsuranceSector,Lead } from '@case-clinical/web/core/data-access'
import { WebInsuranceCreateStore } from './web-insurance-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-insurance-create.component.html',
  providers: [WebInsuranceCreateStore],
})
export class WebInsuranceCreateComponent {
    readonly vm$ = this.store.vm$
    readonly legalCases$ = this.store.legalCases$
readonly insuranceTypes$ = this.store.insuranceTypes$
readonly insuranceSectors$ = this.store.insuranceSectors$
readonly leads$ = this.store.leads$

  model:any = {}

parentLegalCaseId: ''
parentInsuranceTypeId: ''
parentInsuranceSectorId: ''
parentLeadId: ''

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
WebUiFormField.input('policyNumber', { label: 'Policy Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('insuranceCompany', { label: 'Insurance Company' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('minimumCoverageAmount', { label: 'Minimum Coverage Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('maximumCoverageAmount', { label: 'Maximum Coverage Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('isStackable', { label: 'Is Stackable' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('adjuster', { label: 'Adjuster' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('legalCaseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLegalCaseId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'insurance-type',
          'insuranceTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('insuranceTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentInsuranceTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'insurance-sector',
          'insuranceSectorId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('insuranceSectorId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentInsuranceSectorId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'lead',
          'leadId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('leadId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLeadId = s
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
    private readonly store: WebInsuranceCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createInsurance(input) {

    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    if(this.parentInsuranceTypeId != ''){
      input = {...input, insuranceTypeId: this.parentInsuranceTypeId} 
    }


    if(this.parentInsuranceSectorId != ''){
      input = {...input, insuranceSectorId: this.parentInsuranceSectorId} 
    }


    if(this.parentLeadId != ''){
      input = {...input, leadId: this.parentLeadId} 
    }


    this.store.createInsuranceEffect(input)
  }
}
