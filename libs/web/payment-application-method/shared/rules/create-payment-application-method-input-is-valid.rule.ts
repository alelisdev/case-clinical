
import {UserCreatePaymentApplicationMethodInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {PaymentApplicationMethodNameIsValidRule} from './payment-application-method-name-is-valid.rule'

export class CreatePaymentApplicationMethodInputIsValidRule extends CompositeRule {target: UserCreatePaymentApplicationMethodInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreatePaymentApplicationMethodInput, isDisplayable = false) {
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
      new PaymentApplicationMethodNameIsValidRule(
        'name',
        'The paymentapplicationmethod name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

