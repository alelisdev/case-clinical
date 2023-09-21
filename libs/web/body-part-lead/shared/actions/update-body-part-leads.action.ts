
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {BodyPartLeadBusinessActionBase} from './body-part-lead.business-action-base'
import {BodyPartLeadNameIsValidRule} from '../rules/body-part-lead-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateBodyPartLeadInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateBodyPartLeadsAction extends BodyPartLeadBusinessActionBase<UpdateResult> {

    constructor(private bodyPartLeads: UserUpdateBodyPartLeadInput[]) {
        super('UpdateBodyPartLeadsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.bodyPartLeads,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBodyPartLeads({ input: { bodyPartLeads: this.bodyPartLeads} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateBodyPartLeadAction extends BodyPartLeadBusinessActionBase<boolean> {

    constructor(private bodyPartLead: UserUpdateBodyPartLeadInput, private bodyPartLeadId: string) {
        super('UpdateBodyPartLeadAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.bodyPartLead,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.bodyPartLeadId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBodyPartLead({bodyPartLeadId: this.bodyPartLeadId, input: this.bodyPartLead }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
