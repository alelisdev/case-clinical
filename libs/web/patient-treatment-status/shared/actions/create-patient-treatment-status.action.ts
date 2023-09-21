
import {PatientTreatmentStatusBusinessActionBase} from './patient-treatment-status.business-action-base'
import {PatientTreatmentStatus,UserCreatePatientTreatmentStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePatientTreatmentStatusInputIsValidRule} from '../rules/create-patient-treatment-status-input-is-valid.rule'

export class CreatePatientTreatmentStatusAction extends PatientTreatmentStatusBusinessActionBase<PatientTreatmentStatus> {
  constructor(private input: UserCreatePatientTreatmentStatusInput) {
    super('CreatePatientTreatmentStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePatientTreatmentStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePatientTreatmentStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


