
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ReviewBusinessActionBase} from './review.business-action-base'
import {ReviewNameIsValidRule} from '../rules/review-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateReviewInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateReviewsAction extends ReviewBusinessActionBase<UpdateResult> {

    constructor(private reviews: UserUpdateReviewInput[]) {
        super('UpdateReviewsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.reviews,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateReviews({ input: { reviews: this.reviews} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateReviewAction extends ReviewBusinessActionBase<boolean> {

    constructor(private review: UserUpdateReviewInput, private reviewId: string) {
        super('UpdateReviewAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.review,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.reviewId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateReview({reviewId: this.reviewId, input: this.review }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
