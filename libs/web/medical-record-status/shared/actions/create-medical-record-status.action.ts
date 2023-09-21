
import {MedicalRecordStatusBusinessActionBase} from './medical-record-status.business-action-base'
import {MedicalRecordStatus,UserCreateMedicalRecordStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateMedicalRecordStatusInputIsValidRule} from '../rules/create-medical-record-status-input-is-valid.rule'

export class CreateMedicalRecordStatusAction extends MedicalRecordStatusBusinessActionBase<MedicalRecordStatus> {
  constructor(private input: UserCreateMedicalRecordStatusInput) {
    super('CreateMedicalRecordStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateMedicalRecordStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateMedicalRecordStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


