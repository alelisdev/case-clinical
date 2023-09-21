
import {RoleFeaturePermissionBusinessActionBase} from './role-feature-permission.business-action-base'
import {RoleFeaturePermission,UserCreateRoleFeaturePermissionInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRoleFeaturePermissionInputIsValidRule} from '../rules/create-role-feature-permission-input-is-valid.rule'

export class CreateRoleFeaturePermissionAction extends RoleFeaturePermissionBusinessActionBase<RoleFeaturePermission> {constructor(private input: UserCreateRoleFeaturePermissionInput) {
    super('CreateRoleFeaturePermissionAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRoleFeaturePermissionInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRoleFeaturePermission({ input: this.input }).pipe
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


