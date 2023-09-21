
import {UserCreateInvoiceDetailInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {InvoiceDetailNameIsValidRule} from './invoice-detail-name-is-valid.rule'

export class CreateInvoiceDetailInputIsValidRule extends CompositeRule {target: UserCreateInvoiceDetailInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateInvoiceDetailInput, isDisplayable = false) {
    super(name, message, isDisplayable)
    this.target = target

    this.configureRules()
  }

  private configureRules() {this.rules.push(
      new IsNotNullOrUndefined(
        'NotificationIsNotNull',
        'The form message cannot be null or undefined.',
        this.target,
        this.doNotDisplayToUser,
      ),
    )
    this.rules.push(
      new InvoiceDetailNameIsValidRule(
        'name',
        'The invoicedetail name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

