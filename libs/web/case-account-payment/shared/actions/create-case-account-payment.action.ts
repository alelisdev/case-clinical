
import {CaseAccountPaymentBusinessActionBase} from './case-account-payment.business-action-base'
import {CaseAccountPayment,UserCreateCaseAccountPaymentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCaseAccountPaymentInputIsValidRule} from '../rules/create-case-account-payment-input-is-valid.rule'

export class CreateCaseAccountPaymentAction extends CaseAccountPaymentBusinessActionBase<CaseAccountPayment> {
  constructor(private input: UserCreateCaseAccountPaymentInput) {
    super('CreateCaseAccountPaymentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCaseAccountPaymentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCaseAccountPayment({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


