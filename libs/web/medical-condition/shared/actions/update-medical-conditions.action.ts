
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {MedicalConditionBusinessActionBase} from './medical-condition.business-action-base'
import {MedicalConditionNameIsValidRule} from '../rules/medical-condition-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateMedicalConditionInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateMedicalConditionsAction extends MedicalConditionBusinessActionBase<UpdateResult> {

    constructor(private medicalConditions: UserUpdateMedicalConditionInput[]) {
        super('UpdateMedicalConditionsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalConditions,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalConditions({ input: { medicalConditions: this.medicalConditions} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateMedicalConditionAction extends MedicalConditionBusinessActionBase<boolean> {

    constructor(private medicalCondition: UserUpdateMedicalConditionInput, private medicalConditionId: string) {
        super('UpdateMedicalConditionAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalCondition,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.medicalConditionId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalCondition({medicalConditionId: this.medicalConditionId, input: this.medicalCondition }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
