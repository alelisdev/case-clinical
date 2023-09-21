
import {LeadSourceBusinessActionBase} from './lead-source.business-action-base'
import {LeadSource,UserCreateLeadSourceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLeadSourceInputIsValidRule} from '../rules/create-lead-source-input-is-valid.rule'

export class CreateLeadSourceAction extends LeadSourceBusinessActionBase<LeadSource> {
  constructor(private input: UserCreateLeadSourceInput) {
    super('CreateLeadSourceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLeadSourceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLeadSource({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


