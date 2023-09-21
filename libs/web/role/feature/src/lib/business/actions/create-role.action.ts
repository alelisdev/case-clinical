
import {RoleBusinessActionBase} from './role.business-action-base'
import {Role,UserCreateRoleInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRoleInputIsValidRule} from '../rules/create-role-input-is-valid.rule'

export class CreateRoleAction extends RoleBusinessActionBase<Role> {constructor(private input: UserCreateRoleInput) {
    super('CreateRoleAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRoleInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRole({ input: this.input }).pipe
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


