
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {BalanceRequestBusinessActionBase} from './balance-request.business-action-base'
import {BalanceRequestNameIsValidRule} from '../rules/balance-request-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateBalanceRequestInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateBalanceRequestsAction extends BalanceRequestBusinessActionBase<UpdateResult> {

    constructor(private balanceRequests: UserUpdateBalanceRequestInput[]) {
        super('UpdateBalanceRequestsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.balanceRequests,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBalanceRequests({ input: { balanceRequests: this.balanceRequests} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateBalanceRequestAction extends BalanceRequestBusinessActionBase<boolean> {

    constructor(private balanceRequest: UserUpdateBalanceRequestInput, private balanceRequestId: string) {
        super('UpdateBalanceRequestAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.balanceRequest,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.balanceRequestId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBalanceRequest({balanceRequestId: this.balanceRequestId, input: this.balanceRequest }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
