
import {UserCreateClinicalProviderSpecialtyInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {ClinicalProviderSpecialtyNameIsValidRule} from './clinical-provider-specialty-name-is-valid.rule'

export class CreateClinicalProviderSpecialtyInputIsValidRule extends CompositeRule {target: UserCreateClinicalProviderSpecialtyInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateClinicalProviderSpecialtyInput, isDisplayable = false) {
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
      new ClinicalProviderSpecialtyNameIsValidRule(
        'name',
        'The clinicalproviderspecialty name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

