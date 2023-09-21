
import {EligibilityRequestBusinessActionBase} from './eligibility-request.business-action-base'
import {EligibilityRequest,UserCreateEligibilityRequestInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateEligibilityRequestInputIsValidRule} from '../rules/create-eligibility-request-input-is-valid.rule'

export class CreateEligibilityRequestAction extends EligibilityRequestBusinessActionBase<EligibilityRequest> {
  constructor(private input: UserCreateEligibilityRequestInput) {
    super('CreateEligibilityRequestAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateEligibilityRequestInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateEligibilityRequest({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


