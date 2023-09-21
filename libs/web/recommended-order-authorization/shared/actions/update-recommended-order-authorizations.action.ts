
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RecommendedOrderAuthorizationBusinessActionBase} from './recommended-order-authorization.business-action-base'
import {RecommendedOrderAuthorizationNameIsValidRule} from '../rules/recommended-order-authorization-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRecommendedOrderAuthorizationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRecommendedOrderAuthorizationsAction extends RecommendedOrderAuthorizationBusinessActionBase<UpdateResult> {

    constructor(private recommendedOrderAuthorizations: UserUpdateRecommendedOrderAuthorizationInput[]) {
        super('UpdateRecommendedOrderAuthorizationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.recommendedOrderAuthorizations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRecommendedOrderAuthorizations({ input: { recommendedOrderAuthorizations: this.recommendedOrderAuthorizations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRecommendedOrderAuthorizationAction extends RecommendedOrderAuthorizationBusinessActionBase<boolean> {

    constructor(private recommendedOrderAuthorization: UserUpdateRecommendedOrderAuthorizationInput, private recommendedOrderAuthorizationId: string) {
        super('UpdateRecommendedOrderAuthorizationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.recommendedOrderAuthorization,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.recommendedOrderAuthorizationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRecommendedOrderAuthorization({recommendedOrderAuthorizationId: this.recommendedOrderAuthorizationId, input: this.recommendedOrderAuthorization }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
