
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {HealthInsuranceBusinessActionBase} from './health-insurance.business-action-base'
import {HealthInsuranceNameIsValidRule} from '../rules/health-insurance-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateHealthInsuranceInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateHealthInsurancesAction extends HealthInsuranceBusinessActionBase<UpdateResult> {

    constructor(private healthInsurances: UserUpdateHealthInsuranceInput[]) {
        super('UpdateHealthInsurancesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.healthInsurances,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateHealthInsurances({ input: { healthInsurances: this.healthInsurances} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateHealthInsuranceAction extends HealthInsuranceBusinessActionBase<boolean> {

    constructor(private healthInsurance: UserUpdateHealthInsuranceInput, private healthInsuranceId: string) {
        super('UpdateHealthInsuranceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.healthInsurance,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.healthInsuranceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateHealthInsurance({healthInsuranceId: this.healthInsuranceId, input: this.healthInsurance }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
