
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PayorTypeBusinessActionBase} from './payor-type.business-action-base'
import {PayorTypeNameIsValidRule} from '../rules/payor-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePayorTypeInput} from '@case-clinical/shared/util/sdk';

export class UpdatePayorTypesAction extends PayorTypeBusinessActionBase<boolean> {

    constructor(private payorTypes: UserUpdatePayorTypeInput[]) {
        super('UpdatePayorTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.payorTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePayorTypes({ input: { payorTypes: this.payorTypes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePayorTypeAction extends PayorTypeBusinessActionBase<boolean> {

    constructor(private payorType: UserUpdatePayorTypeInput, private payorTypeId: string) {
        super('UpdatePayorTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.payorType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.payorTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePayorType({payorTypeId: this.payorTypeId, input: this.payorType }).pipe(
                switchMap(() => of(true))
            )
    }
}
