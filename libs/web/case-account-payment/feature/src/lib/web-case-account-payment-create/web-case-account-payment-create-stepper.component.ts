
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Payment,CaseAccount } from '@case-clinical/web/core/data-access'
import { WebCaseAccountPaymentCreateStore } from './web-case-account-payment-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-case-account-payment-create.component.html',
  providers: [WebCaseAccountPaymentCreateStore],
})
export class WebCaseAccountPaymentCreateComponent {
    readonly vm$ = this.store.vm$
    readonly payments$ = this.store.payments$
readonly caseAccounts$ = this.store.caseAccounts$

  model:any = {}

parentPaymentId: ''
parentCaseAccountId: ''

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
WebUiFormField.currency('amountApplied', { label: 'Amount Applied' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'payment',
          'paymentId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebCaseAccountPaymentCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCaseAccountPayment(input) {

    if(this.parentPaymentId != ''){
      input = {...input, paymentId: this.parentPaymentId} 
    }


    if(this.parentCaseAccountId != ''){
      input = {...input, caseAccountId: this.parentCaseAccountId} 
    }


    this.store.createCaseAccountPaymentEffect(input)
  }
}
