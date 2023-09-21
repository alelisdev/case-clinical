import {IsNotNullOrUndefined,CellIdIsValidRule } from '@schema-driven/rules-engine'
import {LeadBusinessActionBase} from './lead.business-action-base'
import {of} from 'rxjs'
import {switchMap} from 'rxjs';
import { UserUpdateLeadInput } from '@case-clinical/shared/util/sdk';

export class SyncMrnToPharmacyAction extends LeadBusinessActionBase<boolean> {

    constructor(private input: UserUpdateLeadInput) {
        super('SyncMrnToPharmacyAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.input,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.input.id,
                true
                )
        )
    }

    performAction()
    {
        // this.response = this.businessProvider.data.userSync({leadId: this.leadId, input: this.lead }).pipe(
        //         switchMap((response) => of(response.data.updated))
        //     )
    }
}
