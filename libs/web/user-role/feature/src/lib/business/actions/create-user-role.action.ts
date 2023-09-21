
import {UserRoleBusinessActionBase} from './user-role.business-action-base'
import {UserRole,UserCreateUserRoleInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateUserRoleInputIsValidRule} from '../rules/create-user-role-input-is-valid.rule'

export class CreateUserRoleAction extends UserRoleBusinessActionBase<UserRole> {constructor(private input: UserCreateUserRoleInput) {
    super('CreateUserRoleAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateUserRoleInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateUserRole({ input: this.input }).pipe
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


