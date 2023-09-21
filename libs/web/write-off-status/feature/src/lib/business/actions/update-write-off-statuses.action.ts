
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {WriteOffStatusBusinessActionBase} from './write-off-status.business-action-base'
import {WriteOffStatusNameIsValidRule} from '../rules/write-off-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateWriteOffStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdateWriteOffStatusesAction extends WriteOffStatusBusinessActionBase<boolean> {

    constructor(private writeOffStatuses: UserUpdateWriteOffStatusInput[]) {
        super('UpdateWriteOffStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.writeOffStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateWriteOffStatuses({ input: { writeOffStatuses: this.writeOffStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateWriteOffStatusAction extends WriteOffStatusBusinessActionBase<boolean> {

    constructor(private writeOffStatus: UserUpdateWriteOffStatusInput, private writeOffStatusId: string) {
        super('UpdateWriteOffStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.writeOffStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.writeOffStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateWriteOffStatus({writeOffStatusId: this.writeOffStatusId, input: this.writeOffStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
