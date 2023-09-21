
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RecommendedOrderBusinessActionBase} from './recommended-order.business-action-base'
import {RecommendedOrderNameIsValidRule} from '../rules/recommended-order-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRecommendedOrderInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRecommendedOrdersAction extends RecommendedOrderBusinessActionBase<UpdateResult> {

    constructor(private recommendedOrders: UserUpdateRecommendedOrderInput[]) {
        super('UpdateRecommendedOrdersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.recommendedOrders,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRecommendedOrders({ input: { recommendedOrders: this.recommendedOrders} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRecommendedOrderAction extends RecommendedOrderBusinessActionBase<boolean> {

    constructor(private recommendedOrder: UserUpdateRecommendedOrderInput, private recommendedOrderId: string) {
        super('UpdateRecommendedOrderAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.recommendedOrder,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.recommendedOrderId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRecommendedOrder({recommendedOrderId: this.recommendedOrderId, input: this.recommendedOrder }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
