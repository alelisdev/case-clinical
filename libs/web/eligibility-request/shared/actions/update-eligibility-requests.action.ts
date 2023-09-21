
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {EligibilityRequestBusinessActionBase} from './eligibility-request.business-action-base'
import {EligibilityRequestNameIsValidRule} from '../rules/eligibility-request-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateEligibilityRequestInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateEligibilityRequestsAction extends EligibilityRequestBusinessActionBase<UpdateResult> {

    constructor(private eligibilityRequests: UserUpdateEligibilityRequestInput[]) {
        super('UpdateEligibilityRequestsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.eligibilityRequests,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEligibilityRequests({ input: { eligibilityRequests: this.eligibilityRequests} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateEligibilityRequestAction extends EligibilityRequestBusinessActionBase<boolean> {

    constructor(private eligibilityRequest: UserUpdateEligibilityRequestInput, private eligibilityRequestId: string) {
        super('UpdateEligibilityRequestAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.eligibilityRequest,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.eligibilityRequestId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEligibilityRequest({eligibilityRequestId: this.eligibilityRequestId, input: this.eligibilityRequest }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
