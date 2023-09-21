
import {UserCreateServiceInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {ServiceNameIsValidRule} from './service-name-is-valid.rule'

export class CreateServiceInputIsValidRule extends CompositeRule {target: UserCreateServiceInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateServiceInput, isDisplayable = false) {
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
      new ServiceNameIsValidRule(
        'name',
        'The service name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

