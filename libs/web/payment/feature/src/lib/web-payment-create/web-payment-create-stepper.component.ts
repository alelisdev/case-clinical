
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { BatchControl,Bank,PayorType,PaymentType,PaymentApplicationMethod } from '@case-clinical/web/core/data-access'
import { WebPaymentCreateStore } from './web-payment-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-payment-create.component.html',
  providers: [WebPaymentCreateStore],
})
export class WebPaymentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly batchControls$ = this.store.batchControls$
readonly banks$ = this.store.banks$
readonly payorTypes$ = this.store.payorTypes$
readonly paymentTypes$ = this.store.paymentTypes$
readonly paymentApplicationMethods$ = this.store.paymentApplicationMethods$

  model:any = {}

parentBatchControlId: ''
parentBankId: ''
parentPayorTypeId: ''
parentPaymentTypeId: ''
parentPaymentApplicationMethodId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.date('paidOn', { label: 'Paid on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.currency('amount', { label: 'Amount' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('collected', { label: 'Collected' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('dac', { label: 'Dac' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('isPartial', { label: 'Is Partial' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('dateReceived', { label: 'Date Received' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('memo', { label: 'Memo' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created by' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('securitizationGroup', { label: 'Securitization Group' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    
  WebUiFormField.selectForm(
          'batch-control',
          'batchControlId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('batchControlId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentBatchControlId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'bank',
          'bankId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('bankId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentBankId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'payor-type',
          'payorTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('payorTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPayorTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'payment-type',
          'paymentTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('paymentTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPaymentTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'payment-application-method',
          'paymentApplicationMethodId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('paymentApplicationMethodId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPaymentApplicationMethodId = s
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
    private readonly store: WebPaymentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPayment(input) {

    if(this.parentBatchControlId != ''){
      input = {...input, batchControlId: this.parentBatchControlId} 
    }


    if(this.parentBankId != ''){
      input = {...input, bankId: this.parentBankId} 
    }


    if(this.parentPayorTypeId != ''){
      input = {...input, payorTypeId: this.parentPayorTypeId} 
    }


    if(this.parentPaymentTypeId != ''){
      input = {...input, paymentTypeId: this.parentPaymentTypeId} 
    }


    if(this.parentPaymentApplicationMethodId != ''){
      input = {...input, paymentApplicationMethodId: this.parentPaymentApplicationMethodId} 
    }


    this.store.createPaymentEffect(input)
  }
}
