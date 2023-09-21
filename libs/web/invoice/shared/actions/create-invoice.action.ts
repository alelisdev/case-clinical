
import {InvoiceBusinessActionBase} from './invoice.business-action-base'
import {Invoice,UserCreateInvoiceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateInvoiceInputIsValidRule} from '../rules/create-invoice-input-is-valid.rule'

export class CreateInvoiceAction extends InvoiceBusinessActionBase<Invoice> {
  constructor(private input: UserCreateInvoiceInput) {
    super('CreateInvoiceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateInvoiceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateInvoice({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


