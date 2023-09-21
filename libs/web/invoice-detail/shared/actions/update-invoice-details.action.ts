
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {InvoiceDetailBusinessActionBase} from './invoice-detail.business-action-base'
import {InvoiceDetailNameIsValidRule} from '../rules/invoice-detail-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateInvoiceDetailInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateInvoiceDetailsAction extends InvoiceDetailBusinessActionBase<UpdateResult> {

    constructor(private invoiceDetails: UserUpdateInvoiceDetailInput[]) {
        super('UpdateInvoiceDetailsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.invoiceDetails,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInvoiceDetails({ input: { invoiceDetails: this.invoiceDetails} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateInvoiceDetailAction extends InvoiceDetailBusinessActionBase<boolean> {

    constructor(private invoiceDetail: UserUpdateInvoiceDetailInput, private invoiceDetailId: string) {
        super('UpdateInvoiceDetailAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.invoiceDetail,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.invoiceDetailId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInvoiceDetail({invoiceDetailId: this.invoiceDetailId, input: this.invoiceDetail }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
