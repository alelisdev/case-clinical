
import {TeamBusinessActionBase} from './team.business-action-base'
import {Team,UserCreateTeamInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTeamInputIsValidRule} from '../rules/create-team-input-is-valid.rule'

export class CreateTeamAction extends TeamBusinessActionBase<Team> {
  constructor(private input: UserCreateTeamInput) {
    super('CreateTeamAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTeamInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTeam({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


