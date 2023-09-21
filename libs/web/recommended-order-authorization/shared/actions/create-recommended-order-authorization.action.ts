
import {RecommendedOrderAuthorizationBusinessActionBase} from './recommended-order-authorization.business-action-base'
import {RecommendedOrderAuthorization,UserCreateRecommendedOrderAuthorizationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRecommendedOrderAuthorizationInputIsValidRule} from '../rules/create-recommended-order-authorization-input-is-valid.rule'

export class CreateRecommendedOrderAuthorizationAction extends RecommendedOrderAuthorizationBusinessActionBase<RecommendedOrderAuthorization> {
  constructor(private input: UserCreateRecommendedOrderAuthorizationInput) {
    super('CreateRecommendedOrderAuthorizationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRecommendedOrderAuthorizationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRecommendedOrderAuthorization({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


