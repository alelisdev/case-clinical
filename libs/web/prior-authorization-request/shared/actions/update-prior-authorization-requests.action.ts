
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthorizationRequestBusinessActionBase} from './prior-authorization-request.business-action-base'
import {PriorAuthorizationRequestNameIsValidRule} from '../rules/prior-authorization-request-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthorizationRequestInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthorizationRequestsAction extends PriorAuthorizationRequestBusinessActionBase<UpdateResult> {

    constructor(private priorAuthorizationRequests: UserUpdatePriorAuthorizationRequestInput[]) {
        super('UpdatePriorAuthorizationRequestsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationRequests,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationRequests({ input: { priorAuthorizationRequests: this.priorAuthorizationRequests} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePriorAuthorizationRequestAction extends PriorAuthorizationRequestBusinessActionBase<boolean> {

    constructor(private priorAuthorizationRequest: UserUpdatePriorAuthorizationRequestInput, private priorAuthorizationRequestId: string) {
        super('UpdatePriorAuthorizationRequestAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationRequest,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthorizationRequestId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationRequest({priorAuthorizationRequestId: this.priorAuthorizationRequestId, input: this.priorAuthorizationRequest }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
