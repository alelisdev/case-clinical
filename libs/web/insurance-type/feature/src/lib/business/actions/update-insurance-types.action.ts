
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {InsuranceTypeBusinessActionBase} from './insurance-type.business-action-base'
import {InsuranceTypeNameIsValidRule} from '../rules/insurance-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateInsuranceTypeInput} from '@case-clinical/shared/util/sdk';

export class UpdateInsuranceTypesAction extends InsuranceTypeBusinessActionBase<boolean> {

    constructor(private insuranceTypes: UserUpdateInsuranceTypeInput[]) {
        super('UpdateInsuranceTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.insuranceTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInsuranceTypes({ input: { insuranceTypes: this.insuranceTypes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateInsuranceTypeAction extends InsuranceTypeBusinessActionBase<boolean> {

    constructor(private insuranceType: UserUpdateInsuranceTypeInput, private insuranceTypeId: string) {
        super('UpdateInsuranceTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.insuranceType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.insuranceTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInsuranceType({insuranceTypeId: this.insuranceTypeId, input: this.insuranceType }).pipe(
                switchMap(() => of(true))
            )
    }
}
