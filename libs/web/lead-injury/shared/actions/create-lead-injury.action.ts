
import {LeadInjuryBusinessActionBase} from './lead-injury.business-action-base'
import {LeadInjury,UserCreateLeadInjuryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLeadInjuryInputIsValidRule} from '../rules/create-lead-injury-input-is-valid.rule'

export class CreateLeadInjuryAction extends LeadInjuryBusinessActionBase<LeadInjury> {
  constructor(private input: UserCreateLeadInjuryInput) {
    super('CreateLeadInjuryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLeadInjuryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLeadInjury({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


