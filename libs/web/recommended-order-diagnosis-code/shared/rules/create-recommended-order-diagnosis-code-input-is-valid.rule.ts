
import {UserCreateRecommendedOrderDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {RecommendedOrderDiagnosisCodeNameIsValidRule} from './recommended-order-diagnosis-code-name-is-valid.rule'

export class CreateRecommendedOrderDiagnosisCodeInputIsValidRule extends CompositeRule {target: UserCreateRecommendedOrderDiagnosisCodeInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateRecommendedOrderDiagnosisCodeInput, isDisplayable = false) {
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
      new RecommendedOrderDiagnosisCodeNameIsValidRule(
        'name',
        'The recommendedorderdiagnosiscode name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

