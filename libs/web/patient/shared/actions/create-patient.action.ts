
import {PatientBusinessActionBase} from './patient.business-action-base'
import {Patient,UserCreatePatientInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePatientInputIsValidRule} from '../rules/create-patient-input-is-valid.rule'

export class CreatePatientAction extends PatientBusinessActionBase<Patient> {
  constructor(private input: UserCreatePatientInput) {
    super('CreatePatientAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePatientInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePatient({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


