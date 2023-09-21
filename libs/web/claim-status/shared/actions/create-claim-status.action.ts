
import {ClaimStatusBusinessActionBase} from './claim-status.business-action-base'
import {ClaimStatus,UserCreateClaimStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClaimStatusInputIsValidRule} from '../rules/create-claim-status-input-is-valid.rule'

export class CreateClaimStatusAction extends ClaimStatusBusinessActionBase<ClaimStatus> {
  constructor(private input: UserCreateClaimStatusInput) {
    super('CreateClaimStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClaimStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClaimStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


