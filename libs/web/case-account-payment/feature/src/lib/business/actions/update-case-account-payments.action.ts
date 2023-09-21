
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CaseAccountPaymentBusinessActionBase} from './case-account-payment.business-action-base'
import {CaseAccountPaymentNameIsValidRule} from '../rules/case-account-payment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCaseAccountPaymentInput} from '@case-clinical/shared/util/sdk';

export class UpdateCaseAccountPaymentsAction extends CaseAccountPaymentBusinessActionBase<boolean> {

    constructor(private caseAccountPayments: UserUpdateCaseAccountPaymentInput[]) {
        super('UpdateCaseAccountPaymentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseAccountPayments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseAccountPayments({ input: { caseAccountPayments: this.caseAccountPayments} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCaseAccountPaymentAction extends CaseAccountPaymentBusinessActionBase<boolean> {

    constructor(private caseAccountPayment: UserUpdateCaseAccountPaymentInput, private caseAccountPaymentId: string) {
        super('UpdateCaseAccountPaymentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseAccountPayment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.caseAccountPaymentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseAccountPayment({caseAccountPaymentId: this.caseAccountPaymentId, input: this.caseAccountPayment }).pipe(
                switchMap(() => of(true))
            )
    }
}
