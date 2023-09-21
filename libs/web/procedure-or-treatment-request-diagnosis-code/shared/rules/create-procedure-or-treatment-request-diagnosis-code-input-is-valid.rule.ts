
import {UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule} from './procedure-or-treatment-request-diagnosis-code-name-is-valid.rule'

export class CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule extends CompositeRule {target: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput, isDisplayable = false) {
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
      new ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule(
        'name',
        'The procedureortreatmentrequestdiagnosiscode name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

