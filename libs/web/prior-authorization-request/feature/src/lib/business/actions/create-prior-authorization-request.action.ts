
import {PriorAuthorizationRequestBusinessActionBase} from './prior-authorization-request.business-action-base'
import {PriorAuthorizationRequest,UserCreatePriorAuthorizationRequestInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthorizationRequestInputIsValidRule} from '../rules/create-prior-authorization-request-input-is-valid.rule'

export class CreatePriorAuthorizationRequestAction extends PriorAuthorizationRequestBusinessActionBase<PriorAuthorizationRequest> {constructor(private input: UserCreatePriorAuthorizationRequestInput) {
    super('CreatePriorAuthorizationRequestAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthorizationRequestInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationRequest({ input: this.input }).pipe
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


