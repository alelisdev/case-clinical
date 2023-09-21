
import {ReferralRequestBusinessActionBase} from './referral-request.business-action-base'
import {ReferralRequest,UserCreateReferralRequestInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateReferralRequestInputIsValidRule} from '../rules/create-referral-request-input-is-valid.rule'

export class CreateReferralRequestAction extends ReferralRequestBusinessActionBase<ReferralRequest> {
  constructor(private input: UserCreateReferralRequestInput) {
    super('CreateReferralRequestAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateReferralRequestInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateReferralRequest({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


