
import {UserCreateRequestAdditionalVisitInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {RequestAdditionalVisitNameIsValidRule} from './request-additional-visit-name-is-valid.rule'

export class CreateRequestAdditionalVisitInputIsValidRule extends CompositeRule {target: UserCreateRequestAdditionalVisitInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateRequestAdditionalVisitInput, isDisplayable = false) {
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
      new RequestAdditionalVisitNameIsValidRule(
        'name',
        'The requestadditionalvisit name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

