
import {ProcedureOrTreatmentRequestAuthorizationBusinessActionBase} from './procedure-or-treatment-request-authorization.business-action-base'
import {ProcedureOrTreatmentRequestAuthorization,UserCreateProcedureOrTreatmentRequestAuthorizationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule} from '../rules/create-procedure-or-treatment-request-authorization-input-is-valid.rule'

export class CreateProcedureOrTreatmentRequestAuthorizationAction extends ProcedureOrTreatmentRequestAuthorizationBusinessActionBase<ProcedureOrTreatmentRequestAuthorization> {
  constructor(private input: UserCreateProcedureOrTreatmentRequestAuthorizationInput) {
    super('CreateProcedureOrTreatmentRequestAuthorizationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureOrTreatmentRequestAuthorizationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureOrTreatmentRequestAuthorization({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


