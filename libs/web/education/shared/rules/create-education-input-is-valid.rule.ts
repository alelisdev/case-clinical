
import {UserCreateEducationInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {EducationNameIsValidRule} from './education-name-is-valid.rule'

export class CreateEducationInputIsValidRule extends CompositeRule {target: UserCreateEducationInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateEducationInput, isDisplayable = false) {
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
      new EducationNameIsValidRule(
        'name',
        'The education name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

