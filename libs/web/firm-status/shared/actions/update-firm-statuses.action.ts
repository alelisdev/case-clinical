
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {FirmStatusBusinessActionBase} from './firm-status.business-action-base'
import {FirmStatusNameIsValidRule} from '../rules/firm-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateFirmStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateFirmStatusesAction extends FirmStatusBusinessActionBase<UpdateResult> {

    constructor(private firmStatuses: UserUpdateFirmStatusInput[]) {
        super('UpdateFirmStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.firmStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFirmStatuses({ input: { firmStatuses: this.firmStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateFirmStatusAction extends FirmStatusBusinessActionBase<boolean> {

    constructor(private firmStatus: UserUpdateFirmStatusInput, private firmStatusId: string) {
        super('UpdateFirmStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.firmStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.firmStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFirmStatus({firmStatusId: this.firmStatusId, input: this.firmStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
