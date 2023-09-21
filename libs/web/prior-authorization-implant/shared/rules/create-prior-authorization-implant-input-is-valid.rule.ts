
import {UserCreatePriorAuthorizationImplantInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {PriorAuthorizationImplantNameIsValidRule} from './prior-authorization-implant-name-is-valid.rule'

export class CreatePriorAuthorizationImplantInputIsValidRule extends CompositeRule {target: UserCreatePriorAuthorizationImplantInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreatePriorAuthorizationImplantInput, isDisplayable = false) {
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
      new PriorAuthorizationImplantNameIsValidRule(
        'name',
        'The priorauthorizationimplant name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

