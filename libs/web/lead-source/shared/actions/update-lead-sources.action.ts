
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LeadSourceBusinessActionBase} from './lead-source.business-action-base'
import {LeadSourceNameIsValidRule} from '../rules/lead-source-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLeadSourceInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLeadSourcesAction extends LeadSourceBusinessActionBase<UpdateResult> {

    constructor(private leadSources: UserUpdateLeadSourceInput[]) {
        super('UpdateLeadSourcesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadSources,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadSources({ input: { leadSources: this.leadSources} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLeadSourceAction extends LeadSourceBusinessActionBase<boolean> {

    constructor(private leadSource: UserUpdateLeadSourceInput, private leadSourceId: string) {
        super('UpdateLeadSourceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadSource,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.leadSourceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadSource({leadSourceId: this.leadSourceId, input: this.leadSource }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
