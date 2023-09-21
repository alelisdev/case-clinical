
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebCaseAccountPaymentFormStore } from './web-case-account-payment-form.store'
import { CaseAccountPayment,Payment,CaseAccount } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-case-account-payment-form',
  providers: [WebCaseAccountPaymentFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(caseAccountPayment))" [model]="caseAccountPayment ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiCaseAccountPaymentComponent
    {
  @Input() caseAccountPayment: CaseAccountPayment = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentPaymentId: ''
parentCaseAccountId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'payment',
          'paymentId',
        {
          defaultValues: {}, ////Set Parent Values
          createPayment: (event) => {
            if(event?.name) {
              this.store.addPayment(event)
              this.model.paymentId = event.id
              this.form.controls['paymentId'].patchValue(event.id)
              this.form.controls['paymentId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPayments('').subscribe((values) => {
              this.model.paymentId = selected?.id
              this.form.controls['paymentId'].patchValue(selected?.id)
              this.form.controls['paymentId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Payment',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPayments,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPayments('').subscribe()
              this.route.params.pipe(pluck('paymentId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPaymentId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'case-account',
          'caseAccountId',
        {
          defaultValues: {}, ////Set Parent Values
          createCaseAccount: (event) => {
            if(event?.name) {
              this.store.addCaseAccount(event)
              this.model.caseAccountId = event.id
              this.form.controls['caseAccountId'].patchValue(event.id)
              this.form.controls['caseAccountId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterCaseAccounts('').subscribe((values) => {
              this.model.caseAccountId = selected?.id
              this.form.controls['caseAccountId'].patchValue(selected?.id)
              this.form.controls['caseAccountId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Case Account',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterCaseAccounts,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterCaseAccounts('').subscribe()
              this.route.params.pipe(pluck('caseAccountId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCaseAccountId = s
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
WebUiFormField.currency('amountApplied', { label: 'Amount Applied' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})				])

]

  constructor(
    private readonly store: WebCaseAccountPaymentFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,amountApplied,paymentId,caseAccountId }) {
    
    if(this.parentPaymentId != ''){
      paymentId = this.parentPaymentId
    }


    if(this.parentCaseAccountId != ''){
      caseAccountId = this.parentCaseAccountId
    }

    await this.store.createCaseAccountPaymentEffect({ name,amountApplied,paymentId,caseAccountId })

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
