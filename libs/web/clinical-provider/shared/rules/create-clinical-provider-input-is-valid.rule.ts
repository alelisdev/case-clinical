
import {UserCreateClinicalProviderInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {ClinicalProviderNameIsValidRule} from './clinical-provider-name-is-valid.rule'

export class CreateClinicalProviderInputIsValidRule extends CompositeRule {target: UserCreateClinicalProviderInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateClinicalProviderInput, isDisplayable = false) {
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
      new ClinicalProviderNameIsValidRule(
        'name',
        'The clinicalprovider name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

