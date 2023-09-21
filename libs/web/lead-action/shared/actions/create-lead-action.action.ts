
import {LeadActionBusinessActionBase} from './lead-action.business-action-base'
import {LeadAction,UserCreateLeadActionInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLeadActionInputIsValidRule} from '../rules/create-lead-action-input-is-valid.rule'

export class CreateLeadActionAction extends LeadActionBusinessActionBase<LeadAction> {
  constructor(private input: UserCreateLeadActionInput) {
    super('CreateLeadActionAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLeadActionInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLeadAction({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


