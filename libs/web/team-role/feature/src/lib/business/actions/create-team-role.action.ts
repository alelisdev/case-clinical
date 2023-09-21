
import {TeamRoleBusinessActionBase} from './team-role.business-action-base'
import {TeamRole,UserCreateTeamRoleInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTeamRoleInputIsValidRule} from '../rules/create-team-role-input-is-valid.rule'

export class CreateTeamRoleAction extends TeamRoleBusinessActionBase<TeamRole> {constructor(private input: UserCreateTeamRoleInput) {
    super('CreateTeamRoleAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTeamRoleInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTeamRole({ input: this.input }).pipe
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


