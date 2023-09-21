
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ReferralRequestBusinessActionBase} from './referral-request.business-action-base'
import {ReferralRequestNameIsValidRule} from '../rules/referral-request-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateReferralRequestInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateReferralRequestsAction extends ReferralRequestBusinessActionBase<UpdateResult> {

    constructor(private referralRequests: UserUpdateReferralRequestInput[]) {
        super('UpdateReferralRequestsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.referralRequests,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateReferralRequests({ input: { referralRequests: this.referralRequests} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateReferralRequestAction extends ReferralRequestBusinessActionBase<boolean> {

    constructor(private referralRequest: UserUpdateReferralRequestInput, private referralRequestId: string) {
        super('UpdateReferralRequestAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.referralRequest,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.referralRequestId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateReferralRequest({referralRequestId: this.referralRequestId, input: this.referralRequest }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
