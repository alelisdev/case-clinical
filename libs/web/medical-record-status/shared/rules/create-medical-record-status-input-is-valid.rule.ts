
import {UserCreateMedicalRecordStatusInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {MedicalRecordStatusNameIsValidRule} from './medical-record-status-name-is-valid.rule'

export class CreateMedicalRecordStatusInputIsValidRule extends CompositeRule {target: UserCreateMedicalRecordStatusInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateMedicalRecordStatusInput, isDisplayable = false) {
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
      new MedicalRecordStatusNameIsValidRule(
        'name',
        'The medicalrecordstatus name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

