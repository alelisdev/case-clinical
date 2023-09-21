
import {LeadBusinessActionBase} from './lead.business-action-base'
import {Lead,UserCreateLeadInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLeadInputIsValidRule} from '../rules/create-lead-input-is-valid.rule'

export class CreateLeadAction extends LeadBusinessActionBase<Lead> {
  constructor(private input: UserCreateLeadInput) {
    super('CreateLeadAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLeadInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLead({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


