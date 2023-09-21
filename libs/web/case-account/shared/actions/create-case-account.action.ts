
import {CaseAccountBusinessActionBase} from './case-account.business-action-base'
import {CaseAccount,UserCreateCaseAccountInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCaseAccountInputIsValidRule} from '../rules/create-case-account-input-is-valid.rule'

export class CreateCaseAccountAction extends CaseAccountBusinessActionBase<CaseAccount> {
  constructor(private input: UserCreateCaseAccountInput) {
    super('CreateCaseAccountAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCaseAccountInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCaseAccount({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


