
import {ClaimBusinessActionBase} from './claim.business-action-base'
import {Claim,UserCreateClaimInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClaimInputIsValidRule} from '../rules/create-claim-input-is-valid.rule'

export class CreateClaimAction extends ClaimBusinessActionBase<Claim> {constructor(private input: UserCreateClaimInput) {
    super('CreateClaimAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClaimInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClaim({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


