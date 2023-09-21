
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LeadTreatmentBusinessActionBase} from './lead-treatment.business-action-base'
import {LeadTreatmentNameIsValidRule} from '../rules/lead-treatment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLeadTreatmentInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLeadTreatmentsAction extends LeadTreatmentBusinessActionBase<UpdateResult> {

    constructor(private leadTreatments: UserUpdateLeadTreatmentInput[]) {
        super('UpdateLeadTreatmentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadTreatments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadTreatments({ input: { leadTreatments: this.leadTreatments} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLeadTreatmentAction extends LeadTreatmentBusinessActionBase<boolean> {

    constructor(private leadTreatment: UserUpdateLeadTreatmentInput, private leadTreatmentId: string) {
        super('UpdateLeadTreatmentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.leadTreatment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.leadTreatmentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLeadTreatment({leadTreatmentId: this.leadTreatmentId, input: this.leadTreatment }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
