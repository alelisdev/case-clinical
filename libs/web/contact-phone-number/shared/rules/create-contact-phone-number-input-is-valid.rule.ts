
import {UserCreateContactPhoneNumberInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {ContactPhoneNumberNameIsValidRule} from './contact-phone-number-name-is-valid.rule'

export class CreateContactPhoneNumberInputIsValidRule extends CompositeRule {target: UserCreateContactPhoneNumberInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateContactPhoneNumberInput, isDisplayable = false) {
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
      new ContactPhoneNumberNameIsValidRule(
        'name',
        'The contactphonenumber name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

