
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PaymentTypeBusinessActionBase} from './payment-type.business-action-base'
import {PaymentTypeNameIsValidRule} from '../rules/payment-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePaymentTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePaymentTypesAction extends PaymentTypeBusinessActionBase<UpdateResult> {

    constructor(private paymentTypes: UserUpdatePaymentTypeInput[]) {
        super('UpdatePaymentTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.paymentTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePaymentTypes({ input: { paymentTypes: this.paymentTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePaymentTypeAction extends PaymentTypeBusinessActionBase<boolean> {

    constructor(private paymentType: UserUpdatePaymentTypeInput, private paymentTypeId: string) {
        super('UpdatePaymentTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.paymentType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.paymentTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePaymentType({paymentTypeId: this.paymentTypeId, input: this.paymentType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
