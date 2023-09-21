
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebPaymentFormStore } from './web-payment-form.store'
import { Payment,BatchControl,Bank,PayorType,PaymentType,PaymentApplicationMethod } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-payment-form',
  providers: [WebPaymentFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(payment))" [model]="payment ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiPaymentComponent
    {
  @Input() payment: Payment = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

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

  WebUiFormField.selectForm(
          'batch-control',
          'batchControlId',
        {
          defaultValues: {}, ////Set Parent Values
          createBatchControl: (event) => {
            if(event?.name) {
              this.store.addBatchControl(event)
              this.model.batchControlId = event.id
              this.form.controls['batchControlId'].patchValue(event.id)
              this.form.controls['batchControlId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterBatchControls('').subscribe((values) => {
              this.model.batchControlId = selected?.id
              this.form.controls['batchControlId'].patchValue(selected?.id)
              this.form.controls['batchControlId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Batch Control',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterBatchControls,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterBatchControls('').subscribe()
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
          createBank: (event) => {
            if(event?.name) {
              this.store.addBank(event)
              this.model.bankId = event.id
              this.form.controls['bankId'].patchValue(event.id)
              this.form.controls['bankId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterBanks('').subscribe((values) => {
              this.model.bankId = selected?.id
              this.form.controls['bankId'].patchValue(selected?.id)
              this.form.controls['bankId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Bank',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterBanks,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterBanks('').subscribe()
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
          createPayorType: (event) => {
            if(event?.name) {
              this.store.addPayorType(event)
              this.model.payorTypeId = event.id
              this.form.controls['payorTypeId'].patchValue(event.id)
              this.form.controls['payorTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPayorTypes('').subscribe((values) => {
              this.model.payorTypeId = selected?.id
              this.form.controls['payorTypeId'].patchValue(selected?.id)
              this.form.controls['payorTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Payor Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPayorTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPayorTypes('').subscribe()
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
          createPaymentType: (event) => {
            if(event?.name) {
              this.store.addPaymentType(event)
              this.model.paymentTypeId = event.id
              this.form.controls['paymentTypeId'].patchValue(event.id)
              this.form.controls['paymentTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPaymentTypes('').subscribe((values) => {
              this.model.paymentTypeId = selected?.id
              this.form.controls['paymentTypeId'].patchValue(selected?.id)
              this.form.controls['paymentTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Payment Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPaymentTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPaymentTypes('').subscribe()
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
          createPaymentApplicationMethod: (event) => {
            if(event?.name) {
              this.store.addPaymentApplicationMethod(event)
              this.model.paymentApplicationMethodId = event.id
              this.form.controls['paymentApplicationMethodId'].patchValue(event.id)
              this.form.controls['paymentApplicationMethodId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPaymentApplicationMethods('').subscribe((values) => {
              this.model.paymentApplicationMethodId = selected?.id
              this.form.controls['paymentApplicationMethodId'].patchValue(selected?.id)
              this.form.controls['paymentApplicationMethodId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Payment Application Method',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPaymentApplicationMethods,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPaymentApplicationMethods('').subscribe()
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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.date('paidOn', { label: 'Paid On' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.currency('amount', { label: 'Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('collected', { label: 'Collected' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('dac', { label: 'Dac' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('isPartial', { label: 'Is Partial' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('dateReceived', { label: 'Date Received' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('memo', { label: 'Memo' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('createdBy', { label: 'Created By' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('securitizationGroup', { label: 'Securitization Group' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
				])

]

  constructor(
    private readonly store: WebPaymentFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ paidOn,name,batchControlId,bankId,payorTypeId,paymentTypeId,amount,collected,dac,isPartial,dateReceived,memo,createdBy,dateCreated,securitizationGroup,paymentApplicationMethodId }) {
    
    if(this.parentBatchControlId != ''){
      batchControlId = this.parentBatchControlId
    }


    if(this.parentBankId != ''){
      bankId = this.parentBankId
    }


    if(this.parentPayorTypeId != ''){
      payorTypeId = this.parentPayorTypeId
    }


    if(this.parentPaymentTypeId != ''){
      paymentTypeId = this.parentPaymentTypeId
    }


    if(this.parentPaymentApplicationMethodId != ''){
      paymentApplicationMethodId = this.parentPaymentApplicationMethodId
    }

    await this.store.createPaymentEffect({ paidOn,name,batchControlId,bankId,payorTypeId,paymentTypeId,amount,collected,dac,isPartial,dateReceived,memo,createdBy,dateCreated,securitizationGroup,paymentApplicationMethodId })

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
