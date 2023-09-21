
import {PaymentApplicationMethodBusinessActionBase} from './payment-application-method.business-action-base'
import {PaymentApplicationMethod,UserCreatePaymentApplicationMethodInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePaymentApplicationMethodInputIsValidRule} from '../rules/create-payment-application-method-input-is-valid.rule'

export class CreatePaymentApplicationMethodAction extends PaymentApplicationMethodBusinessActionBase<PaymentApplicationMethod> {
  constructor(private input: UserCreatePaymentApplicationMethodInput) {
    super('CreatePaymentApplicationMethodAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePaymentApplicationMethodInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePaymentApplicationMethod({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


