
import {UserCreateProcedureOrTreatmentRequestAuthorizationInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {ProcedureOrTreatmentRequestAuthorizationNameIsValidRule} from './procedure-or-treatment-request-authorization-name-is-valid.rule'

export class CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule extends CompositeRule {target: UserCreateProcedureOrTreatmentRequestAuthorizationInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateProcedureOrTreatmentRequestAuthorizationInput, isDisplayable = false) {
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
      new ProcedureOrTreatmentRequestAuthorizationNameIsValidRule(
        'name',
        'The procedureortreatmentrequestauthorization name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

