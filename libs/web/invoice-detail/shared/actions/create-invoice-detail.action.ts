
import {InvoiceDetailBusinessActionBase} from './invoice-detail.business-action-base'
import {InvoiceDetail,UserCreateInvoiceDetailInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateInvoiceDetailInputIsValidRule} from '../rules/create-invoice-detail-input-is-valid.rule'

export class CreateInvoiceDetailAction extends InvoiceDetailBusinessActionBase<InvoiceDetail> {
  constructor(private input: UserCreateInvoiceDetailInput) {
    super('CreateInvoiceDetailAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateInvoiceDetailInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateInvoiceDetail({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


