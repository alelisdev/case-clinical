
import {PriorAuthorizationProcedureCodeBusinessActionBase} from './prior-authorization-procedure-code.business-action-base'
import {PriorAuthorizationProcedureCode,UserCreatePriorAuthorizationProcedureCodeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthorizationProcedureCodeInputIsValidRule} from '../rules/create-prior-authorization-procedure-code-input-is-valid.rule'

export class CreatePriorAuthorizationProcedureCodeAction extends PriorAuthorizationProcedureCodeBusinessActionBase<PriorAuthorizationProcedureCode> {
  constructor(private input: UserCreatePriorAuthorizationProcedureCodeInput) {
    super('CreatePriorAuthorizationProcedureCodeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthorizationProcedureCodeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationProcedureCode({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


