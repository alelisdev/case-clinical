
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {InsuranceBusinessActionBase} from './insurance.business-action-base'
import {InsuranceNameIsValidRule} from '../rules/insurance-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateInsuranceInput} from '@case-clinical/shared/util/sdk';

export class UpdateInsurancesAction extends InsuranceBusinessActionBase<boolean> {

    constructor(private insurances: UserUpdateInsuranceInput[]) {
        super('UpdateInsurancesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.insurances,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInsurances({ input: { insurances: this.insurances} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateInsuranceAction extends InsuranceBusinessActionBase<boolean> {

    constructor(private insurance: UserUpdateInsuranceInput, private insuranceId: string) {
        super('UpdateInsuranceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.insurance,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.insuranceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInsurance({insuranceId: this.insuranceId, input: this.insurance }).pipe(
                switchMap(() => of(true))
            )
    }
}
