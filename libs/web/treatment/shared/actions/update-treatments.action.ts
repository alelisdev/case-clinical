
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TreatmentBusinessActionBase} from './treatment.business-action-base'
import {TreatmentNameIsValidRule} from '../rules/treatment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTreatmentInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTreatmentsAction extends TreatmentBusinessActionBase<UpdateResult> {

    constructor(private treatments: UserUpdateTreatmentInput[]) {
        super('UpdateTreatmentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.treatments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTreatments({ input: { treatments: this.treatments} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateTreatmentAction extends TreatmentBusinessActionBase<boolean> {

    constructor(private treatment: UserUpdateTreatmentInput, private treatmentId: string) {
        super('UpdateTreatmentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.treatment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.treatmentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTreatment({treatmentId: this.treatmentId, input: this.treatment }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
