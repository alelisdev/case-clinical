
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Contract,ContractedRateKind,ContractKind,VisitKind,ClinicalProvider,Specialty } from '@case-clinical/web/core/data-access'
import { WebContractedRateCreateStore } from './web-contracted-rate-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contracted-rate-create.component.html',
  providers: [WebContractedRateCreateStore],
})
export class WebContractedRateCreateComponent {
    readonly vm$ = this.store.vm$
    readonly contracts$ = this.store.contracts$
readonly contractedRateKinds$ = this.store.contractedRateKinds$
readonly contractKinds$ = this.store.contractKinds$
readonly visitKinds$ = this.store.visitKinds$
readonly clinicalProviders$ = this.store.clinicalProviders$
readonly specialties$ = this.store.specialties$

  model:any = {}

parentContractId: ''
parentContractedRateKindId: ''
parentContractKindId: ''
parentVisitKindId: ''
parentClinicalProviderId: ''
parentSpecialtyId: ''

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
WebUiFormField.currency('amount', { label: 'Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('percentage', { label: 'Percentage' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('reimbursedRate', { label: 'Reimbursed Rate' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('billOnBehalf', { label: 'Bill on Behalf' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' })
    
  WebUiFormField.selectForm(
          'contract',
          'contractId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contractId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContractId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'contracted-rate-kind',
          'contractedRateKindId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contractedRateKindId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContractedRateKindId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'contract-kind',
          'contractKindId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contractKindId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContractKindId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'visit-kind',
          'visitKindId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('visitKindId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentVisitKindId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'clinical-provider',
          'clinicalProviderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('clinicalProviderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClinicalProviderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'specialty',
          'specialtyId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('specialtyId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentSpecialtyId = s
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
    private readonly store: WebContractedRateCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContractedRate(input) {

    if(this.parentContractId != ''){
      input = {...input, contractId: this.parentContractId} 
    }


    if(this.parentContractedRateKindId != ''){
      input = {...input, contractedRateKindId: this.parentContractedRateKindId} 
    }


    if(this.parentContractKindId != ''){
      input = {...input, contractKindId: this.parentContractKindId} 
    }


    if(this.parentVisitKindId != ''){
      input = {...input, visitKindId: this.parentVisitKindId} 
    }


    if(this.parentClinicalProviderId != ''){
      input = {...input, clinicalProviderId: this.parentClinicalProviderId} 
    }


    if(this.parentSpecialtyId != ''){
      input = {...input, specialtyId: this.parentSpecialtyId} 
    }


    this.store.createContractedRateEffect(input)
  }
}
