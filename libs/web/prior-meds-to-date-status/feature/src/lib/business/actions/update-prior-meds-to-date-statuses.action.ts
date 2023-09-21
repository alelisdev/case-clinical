
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorMedsToDateStatusBusinessActionBase} from './prior-meds-to-date-status.business-action-base'
import {PriorMedsToDateStatusNameIsValidRule} from '../rules/prior-meds-to-date-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorMedsToDateStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdatePriorMedsToDateStatusesAction extends PriorMedsToDateStatusBusinessActionBase<boolean> {

    constructor(private priorMedsToDateStatuses: UserUpdatePriorMedsToDateStatusInput[]) {
        super('UpdatePriorMedsToDateStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorMedsToDateStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorMedsToDateStatuses({ input: { priorMedsToDateStatuses: this.priorMedsToDateStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePriorMedsToDateStatusAction extends PriorMedsToDateStatusBusinessActionBase<boolean> {

    constructor(private priorMedsToDateStatus: UserUpdatePriorMedsToDateStatusInput, private priorMedsToDateStatusId: string) {
        super('UpdatePriorMedsToDateStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorMedsToDateStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorMedsToDateStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorMedsToDateStatus({priorMedsToDateStatusId: this.priorMedsToDateStatusId, input: this.priorMedsToDateStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
