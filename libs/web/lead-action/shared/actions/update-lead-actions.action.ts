
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LeadActionBusinessActionBase} from './lead-action.business-action-base'
import {LeadActionNameIsValidRule} from '../rules/lead-action-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLeadActionInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLeadActionsAction extends LeadActionBusinessActionBase<UpdateResult> {

    constructor(private leadActions: UserUpdateLeadActionInput[]) {
        super('UpdateLeadActionsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadActions,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadActions({ input: { leadActions: this.leadActions} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLeadActionAction extends LeadActionBusinessActionBase<boolean> {

    constructor(private leadAction: UserUpdateLeadActionInput, private leadActionId: string) {
        super('UpdateLeadActionAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadAction,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.leadActionId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadAction({leadActionId: this.leadActionId, input: this.leadAction }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
