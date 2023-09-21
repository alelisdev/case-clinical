
import {UserCreateUserCourseProgressInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {UserCourseProgressNameIsValidRule} from './user-course-progress-name-is-valid.rule'

export class CreateUserCourseProgressInputIsValidRule extends CompositeRule {target: UserCreateUserCourseProgressInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateUserCourseProgressInput, isDisplayable = false) {
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
      new UserCourseProgressNameIsValidRule(
        'name',
        'The usercourseprogress name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

