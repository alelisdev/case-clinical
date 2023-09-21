
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClaimStatusBusinessActionBase} from './claim-status.business-action-base'
import {ClaimStatusNameIsValidRule} from '../rules/claim-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClaimStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClaimStatusesAction extends ClaimStatusBusinessActionBase<UpdateResult> {

    constructor(private claimStatuses: UserUpdateClaimStatusInput[]) {
        super('UpdateClaimStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.claimStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClaimStatuses({ input: { claimStatuses: this.claimStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClaimStatusAction extends ClaimStatusBusinessActionBase<boolean> {

    constructor(private claimStatus: UserUpdateClaimStatusInput, private claimStatusId: string) {
        super('UpdateClaimStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.claimStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.claimStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClaimStatus({claimStatusId: this.claimStatusId, input: this.claimStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
