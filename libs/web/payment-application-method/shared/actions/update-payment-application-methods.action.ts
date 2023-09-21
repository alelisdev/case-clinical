
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PaymentApplicationMethodBusinessActionBase} from './payment-application-method.business-action-base'
import {PaymentApplicationMethodNameIsValidRule} from '../rules/payment-application-method-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePaymentApplicationMethodInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePaymentApplicationMethodsAction extends PaymentApplicationMethodBusinessActionBase<UpdateResult> {

    constructor(private paymentApplicationMethods: UserUpdatePaymentApplicationMethodInput[]) {
        super('UpdatePaymentApplicationMethodsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.paymentApplicationMethods,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePaymentApplicationMethods({ input: { paymentApplicationMethods: this.paymentApplicationMethods} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePaymentApplicationMethodAction extends PaymentApplicationMethodBusinessActionBase<boolean> {

    constructor(private paymentApplicationMethod: UserUpdatePaymentApplicationMethodInput, private paymentApplicationMethodId: string) {
        super('UpdatePaymentApplicationMethodAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.paymentApplicationMethod,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.paymentApplicationMethodId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePaymentApplicationMethod({paymentApplicationMethodId: this.paymentApplicationMethodId, input: this.paymentApplicationMethod }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
