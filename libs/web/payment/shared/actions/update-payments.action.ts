
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PaymentBusinessActionBase} from './payment.business-action-base'
import {PaymentNameIsValidRule} from '../rules/payment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePaymentInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePaymentsAction extends PaymentBusinessActionBase<UpdateResult> {

    constructor(private payments: UserUpdatePaymentInput[]) {
        super('UpdatePaymentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.payments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePayments({ input: { payments: this.payments} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePaymentAction extends PaymentBusinessActionBase<boolean> {

    constructor(private payment: UserUpdatePaymentInput, private paymentId: string) {
        super('UpdatePaymentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.payment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.paymentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePayment({paymentId: this.paymentId, input: this.payment }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
