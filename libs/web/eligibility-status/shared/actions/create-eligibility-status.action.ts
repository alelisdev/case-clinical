
import {EligibilityStatusBusinessActionBase} from './eligibility-status.business-action-base'
import {EligibilityStatus,UserCreateEligibilityStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateEligibilityStatusInputIsValidRule} from '../rules/create-eligibility-status-input-is-valid.rule'

export class CreateEligibilityStatusAction extends EligibilityStatusBusinessActionBase<EligibilityStatus> {
  constructor(private input: UserCreateEligibilityStatusInput) {
    super('CreateEligibilityStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateEligibilityStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateEligibilityStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


