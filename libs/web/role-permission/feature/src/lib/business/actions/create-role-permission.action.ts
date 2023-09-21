
import {RolePermissionBusinessActionBase} from './role-permission.business-action-base'
import {RolePermission,UserCreateRolePermissionInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRolePermissionInputIsValidRule} from '../rules/create-role-permission-input-is-valid.rule'

export class CreateRolePermissionAction extends RolePermissionBusinessActionBase<RolePermission> {constructor(private input: UserCreateRolePermissionInput) {
    super('CreateRolePermissionAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRolePermissionInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRolePermission({ input: this.input }).pipe
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


