
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AttorneyStatusBusinessActionBase} from './attorney-status.business-action-base'
import {AttorneyStatusNameIsValidRule} from '../rules/attorney-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAttorneyStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdateAttorneyStatusesAction extends AttorneyStatusBusinessActionBase<boolean> {

    constructor(private attorneyStatuses: UserUpdateAttorneyStatusInput[]) {
        super('UpdateAttorneyStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.attorneyStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAttorneyStatuses({ input: { attorneyStatuses: this.attorneyStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateAttorneyStatusAction extends AttorneyStatusBusinessActionBase<boolean> {

    constructor(private attorneyStatus: UserUpdateAttorneyStatusInput, private attorneyStatusId: string) {
        super('UpdateAttorneyStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.attorneyStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.attorneyStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAttorneyStatus({attorneyStatusId: this.attorneyStatusId, input: this.attorneyStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
