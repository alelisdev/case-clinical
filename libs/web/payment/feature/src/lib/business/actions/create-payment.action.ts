
import {PaymentBusinessActionBase} from './payment.business-action-base'
import {Payment,UserCreatePaymentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePaymentInputIsValidRule} from '../rules/create-payment-input-is-valid.rule'

export class CreatePaymentAction extends PaymentBusinessActionBase<Payment> {constructor(private input: UserCreatePaymentInput) {
    super('CreatePaymentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePaymentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePayment({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


