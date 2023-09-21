
import {MedicalRecordBusinessActionBase} from './medical-record.business-action-base'
import {MedicalRecord,UserCreateMedicalRecordInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateMedicalRecordInputIsValidRule} from '../rules/create-medical-record-input-is-valid.rule'

export class CreateMedicalRecordAction extends MedicalRecordBusinessActionBase<MedicalRecord> {
  constructor(private input: UserCreateMedicalRecordInput) {
    super('CreateMedicalRecordAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateMedicalRecordInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateMedicalRecord({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


