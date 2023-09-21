
import {UserCreateCaseProgressStatusInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {CaseProgressStatusNameIsValidRule} from './case-progress-status-name-is-valid.rule'

export class CreateCaseProgressStatusInputIsValidRule extends CompositeRule {target: UserCreateCaseProgressStatusInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateCaseProgressStatusInput, isDisplayable = false) {
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
      new CaseProgressStatusNameIsValidRule(
        'name',
        'The caseprogressstatus name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

