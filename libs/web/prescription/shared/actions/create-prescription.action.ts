
import {PrescriptionBusinessActionBase} from './prescription.business-action-base'
import {Prescription,UserCreatePrescriptionInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePrescriptionInputIsValidRule} from '../rules/create-prescription-input-is-valid.rule'

export class CreatePrescriptionAction extends PrescriptionBusinessActionBase<Prescription> {
  constructor(private input: UserCreatePrescriptionInput) {
    super('CreatePrescriptionAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePrescriptionInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePrescription({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


