
import {RecommendedOrderBusinessActionBase} from './recommended-order.business-action-base'
import {RecommendedOrder,UserCreateRecommendedOrderInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRecommendedOrderInputIsValidRule} from '../rules/create-recommended-order-input-is-valid.rule'

export class CreateRecommendedOrderAction extends RecommendedOrderBusinessActionBase<RecommendedOrder> {
  constructor(private input: UserCreateRecommendedOrderInput) {
    super('CreateRecommendedOrderAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRecommendedOrderInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRecommendedOrder({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


