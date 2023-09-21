
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LeadBusinessActionBase} from './lead.business-action-base'
import {LeadNameIsValidRule} from '../rules/lead-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLeadInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLeadsAction extends LeadBusinessActionBase<UpdateResult> {

    constructor(private leads: UserUpdateLeadInput[]) {
        super('UpdateLeadsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leads,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeads({ input: { leads: this.leads} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLeadAction extends LeadBusinessActionBase<boolean> {

    constructor(private lead: UserUpdateLeadInput, private leadId: string) {
        super('UpdateLeadAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.lead,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.leadId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLead({leadId: this.leadId, input: this.lead }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
