
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AuthorizationStatusBusinessActionBase} from './authorization-status.business-action-base'
import {AuthorizationStatusNameIsValidRule} from '../rules/authorization-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAuthorizationStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdateAuthorizationStatusesAction extends AuthorizationStatusBusinessActionBase<boolean> {

    constructor(private authorizationStatuses: UserUpdateAuthorizationStatusInput[]) {
        super('UpdateAuthorizationStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationStatuses({ input: { authorizationStatuses: this.authorizationStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateAuthorizationStatusAction extends AuthorizationStatusBusinessActionBase<boolean> {

    constructor(private authorizationStatus: UserUpdateAuthorizationStatusInput, private authorizationStatusId: string) {
        super('UpdateAuthorizationStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.authorizationStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationStatus({authorizationStatusId: this.authorizationStatusId, input: this.authorizationStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
