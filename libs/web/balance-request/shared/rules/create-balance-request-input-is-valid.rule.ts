
import {UserCreateBalanceRequestInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {BalanceRequestNameIsValidRule} from './balance-request-name-is-valid.rule'

export class CreateBalanceRequestInputIsValidRule extends CompositeRule {target: UserCreateBalanceRequestInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateBalanceRequestInput, isDisplayable = false) {
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
      new BalanceRequestNameIsValidRule(
        'name',
        'The balancerequest name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

