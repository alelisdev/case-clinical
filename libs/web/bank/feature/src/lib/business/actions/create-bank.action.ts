
import {BankBusinessActionBase} from './bank.business-action-base'
import {Bank,UserCreateBankInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateBankInputIsValidRule} from '../rules/create-bank-input-is-valid.rule'

export class CreateBankAction extends BankBusinessActionBase<Bank> {constructor(private input: UserCreateBankInput) {
    super('CreateBankAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateBankInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateBank({ input: this.input }).pipe
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


