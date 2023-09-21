
import {PaymentTypeBusinessActionBase} from './payment-type.business-action-base'
import {PaymentType,UserCreatePaymentTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePaymentTypeInputIsValidRule} from '../rules/create-payment-type-input-is-valid.rule'

export class CreatePaymentTypeAction extends PaymentTypeBusinessActionBase<PaymentType> {constructor(private input: UserCreatePaymentTypeInput) {
    super('CreatePaymentTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePaymentTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePaymentType({ input: this.input }).pipe
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


