
import {ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase} from './procedure-or-treatment-request-diagnosis-code.business-action-base'
import {ProcedureOrTreatmentRequestDiagnosisCode,UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule} from '../rules/create-procedure-or-treatment-request-diagnosis-code-input-is-valid.rule'

export class CreateProcedureOrTreatmentRequestDiagnosisCodeAction extends ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase<ProcedureOrTreatmentRequestDiagnosisCode> {
  constructor(private input: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput) {
    super('CreateProcedureOrTreatmentRequestDiagnosisCodeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureOrTreatmentRequestDiagnosisCodeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureOrTreatmentRequestDiagnosisCode({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


