
import {DiagnosisCodeBusinessActionBase} from './diagnosis-code.business-action-base'
import {DiagnosisCode,UserCreateDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateDiagnosisCodeInputIsValidRule} from '../rules/create-diagnosis-code-input-is-valid.rule'

export class CreateDiagnosisCodeAction extends DiagnosisCodeBusinessActionBase<DiagnosisCode> {
  constructor(private input: UserCreateDiagnosisCodeInput) {
    super('CreateDiagnosisCodeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateDiagnosisCodeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateDiagnosisCode({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


