
import {PriorAuthorizationDiagnosisCodeBusinessActionBase} from './prior-authorization-diagnosis-code.business-action-base'
import {PriorAuthorizationDiagnosisCode,UserCreatePriorAuthorizationDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthorizationDiagnosisCodeInputIsValidRule} from '../rules/create-prior-authorization-diagnosis-code-input-is-valid.rule'

export class CreatePriorAuthorizationDiagnosisCodeAction extends PriorAuthorizationDiagnosisCodeBusinessActionBase<PriorAuthorizationDiagnosisCode> {constructor(private input: UserCreatePriorAuthorizationDiagnosisCodeInput) {
    super('CreatePriorAuthorizationDiagnosisCodeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthorizationDiagnosisCodeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationDiagnosisCode({ input: this.input }).pipe
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


