
import {ReviewBusinessActionBase} from './review.business-action-base'
import {Review,UserCreateReviewInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateReviewInputIsValidRule} from '../rules/create-review-input-is-valid.rule'

export class CreateReviewAction extends ReviewBusinessActionBase<Review> {
  constructor(private input: UserCreateReviewInput) {
    super('CreateReviewAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateReviewInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateReview({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


