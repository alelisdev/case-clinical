
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LeadStatusBusinessActionBase} from './lead-status.business-action-base'
import {LeadStatusNameIsValidRule} from '../rules/lead-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLeadStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLeadStatusesAction extends LeadStatusBusinessActionBase<UpdateResult> {

    constructor(private leadStatuses: UserUpdateLeadStatusInput[]) {
        super('UpdateLeadStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadStatuses({ input: { leadStatuses: this.leadStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLeadStatusAction extends LeadStatusBusinessActionBase<boolean> {

    constructor(private leadStatus: UserUpdateLeadStatusInput, private leadStatusId: string) {
        super('UpdateLeadStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.leadStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadStatus({leadStatusId: this.leadStatusId, input: this.leadStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
