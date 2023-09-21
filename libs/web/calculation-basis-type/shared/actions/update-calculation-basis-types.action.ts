
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CalculationBasisTypeBusinessActionBase} from './calculation-basis-type.business-action-base'
import {CalculationBasisTypeNameIsValidRule} from '../rules/calculation-basis-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCalculationBasisTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateCalculationBasisTypesAction extends CalculationBasisTypeBusinessActionBase<UpdateResult> {

    constructor(private calculationBasisTypes: UserUpdateCalculationBasisTypeInput[]) {
        super('UpdateCalculationBasisTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.calculationBasisTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCalculationBasisTypes({ input: { calculationBasisTypes: this.calculationBasisTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateCalculationBasisTypeAction extends CalculationBasisTypeBusinessActionBase<boolean> {

    constructor(private calculationBasisType: UserUpdateCalculationBasisTypeInput, private calculationBasisTypeId: string) {
        super('UpdateCalculationBasisTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.calculationBasisType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.calculationBasisTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCalculationBasisType({calculationBasisTypeId: this.calculationBasisTypeId, input: this.calculationBasisType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
