
import {AuthorizationDiagnosisCodeBusinessActionBase} from './authorization-diagnosis-code.business-action-base'
import {AuthorizationDiagnosisCode,UserCreateAuthorizationDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAuthorizationDiagnosisCodeInputIsValidRule} from '../rules/create-authorization-diagnosis-code-input-is-valid.rule'

export class CreateAuthorizationDiagnosisCodeAction extends AuthorizationDiagnosisCodeBusinessActionBase<AuthorizationDiagnosisCode> {
  constructor(private input: UserCreateAuthorizationDiagnosisCodeInput) {
    super('CreateAuthorizationDiagnosisCodeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAuthorizationDiagnosisCodeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationDiagnosisCode({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


