
import {AccountStatusBusinessActionBase} from './account-status.business-action-base'
import {AccountStatus,UserCreateAccountStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAccountStatusInputIsValidRule} from '../rules/create-account-status-input-is-valid.rule'

export class CreateAccountStatusAction extends AccountStatusBusinessActionBase<AccountStatus> {
  constructor(private input: UserCreateAccountStatusInput) {
    super('CreateAccountStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAccountStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAccountStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


