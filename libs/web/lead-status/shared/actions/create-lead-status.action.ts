
import {LeadStatusBusinessActionBase} from './lead-status.business-action-base'
import {LeadStatus,UserCreateLeadStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLeadStatusInputIsValidRule} from '../rules/create-lead-status-input-is-valid.rule'

export class CreateLeadStatusAction extends LeadStatusBusinessActionBase<LeadStatus> {
  constructor(private input: UserCreateLeadStatusInput) {
    super('CreateLeadStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLeadStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLeadStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


