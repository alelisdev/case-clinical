
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LeadInjuryBusinessActionBase} from './lead-injury.business-action-base'
import {LeadInjuryNameIsValidRule} from '../rules/lead-injury-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLeadInjuryInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLeadInjuriesAction extends LeadInjuryBusinessActionBase<UpdateResult> {

    constructor(private leadInjuries: UserUpdateLeadInjuryInput[]) {
        super('UpdateLeadInjuriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadInjuries,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadInjuries({ input: { leadInjuries: this.leadInjuries} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLeadInjuryAction extends LeadInjuryBusinessActionBase<boolean> {

    constructor(private leadInjury: UserUpdateLeadInjuryInput, private leadInjuryId: string) {
        super('UpdateLeadInjuryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadInjury,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.leadInjuryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadInjury({leadInjuryId: this.leadInjuryId, input: this.leadInjury }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
