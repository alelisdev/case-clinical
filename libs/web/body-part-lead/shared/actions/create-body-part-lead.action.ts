
import {BodyPartLeadBusinessActionBase} from './body-part-lead.business-action-base'
import {BodyPartLead,UserCreateBodyPartLeadInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateBodyPartLeadInputIsValidRule} from '../rules/create-body-part-lead-input-is-valid.rule'

export class CreateBodyPartLeadAction extends BodyPartLeadBusinessActionBase<BodyPartLead> {
  constructor(private input: UserCreateBodyPartLeadInput) {
    super('CreateBodyPartLeadAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateBodyPartLeadInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateBodyPartLead({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


