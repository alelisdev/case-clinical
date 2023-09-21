
import {ProcedureOrTreatmentRequestBusinessActionBase} from './procedure-or-treatment-request.business-action-base'
import {ProcedureOrTreatmentRequest,UserCreateProcedureOrTreatmentRequestInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureOrTreatmentRequestInputIsValidRule} from '../rules/create-procedure-or-treatment-request-input-is-valid.rule'

export class CreateProcedureOrTreatmentRequestAction extends ProcedureOrTreatmentRequestBusinessActionBase<ProcedureOrTreatmentRequest> {
  constructor(private input: UserCreateProcedureOrTreatmentRequestInput) {
    super('CreateProcedureOrTreatmentRequestAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureOrTreatmentRequestInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureOrTreatmentRequest({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


