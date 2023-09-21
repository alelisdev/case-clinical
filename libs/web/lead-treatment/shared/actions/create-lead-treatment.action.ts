
import {LeadTreatmentBusinessActionBase} from './lead-treatment.business-action-base'
import {LeadTreatment,UserCreateLeadTreatmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLeadTreatmentInputIsValidRule} from '../rules/create-lead-treatment-input-is-valid.rule'

export class CreateLeadTreatmentAction extends LeadTreatmentBusinessActionBase<LeadTreatment> {
  constructor(private input: UserCreateLeadTreatmentInput) {
    super('CreateLeadTreatmentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLeadTreatmentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLeadTreatment({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


