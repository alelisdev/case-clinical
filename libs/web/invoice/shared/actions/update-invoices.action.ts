
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {InvoiceBusinessActionBase} from './invoice.business-action-base'
import {InvoiceNameIsValidRule} from '../rules/invoice-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateInvoiceInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateInvoicesAction extends InvoiceBusinessActionBase<UpdateResult> {

    constructor(private invoices: UserUpdateInvoiceInput[]) {
        super('UpdateInvoicesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.invoices,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInvoices({ input: { invoices: this.invoices} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateInvoiceAction extends InvoiceBusinessActionBase<boolean> {

    constructor(private invoice: UserUpdateInvoiceInput, private invoiceId: string) {
        super('UpdateInvoiceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.invoice,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.invoiceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInvoice({invoiceId: this.invoiceId, input: this.invoice }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
