
import {UserBusinessActionBase} from './user.business-action-base'
import {User,UserCreateUserInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateUserInputIsValidRule} from '../rules/create-user-input-is-valid.rule'

export class CreateUserAction extends UserBusinessActionBase<User> {constructor(private input: UserCreateUserInput) {
    super('CreateUserAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateUserInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateUser({ input: this.input }).pipe
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


