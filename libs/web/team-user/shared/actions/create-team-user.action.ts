
import {TeamUserBusinessActionBase} from './team-user.business-action-base'
import {TeamUser,UserCreateTeamUserInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTeamUserInputIsValidRule} from '../rules/create-team-user-input-is-valid.rule'

export class CreateTeamUserAction extends TeamUserBusinessActionBase<TeamUser> {
  constructor(private input: UserCreateTeamUserInput) {
    super('CreateTeamUserAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTeamUserInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTeamUser({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


