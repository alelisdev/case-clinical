
import {PatientStudyBusinessActionBase} from './patient-study.business-action-base'
import {PatientStudy,UserCreatePatientStudyInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePatientStudyInputIsValidRule} from '../rules/create-patient-study-input-is-valid.rule'

export class CreatePatientStudyAction extends PatientStudyBusinessActionBase<PatientStudy> {constructor(private input: UserCreatePatientStudyInput) {
    super('CreatePatientStudyAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePatientStudyInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePatientStudy({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


