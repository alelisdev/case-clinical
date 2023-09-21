
import {ProcedureBusinessActionBase} from './procedure.business-action-base'
import {Procedure,UserCreateProcedureInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureInputIsValidRule} from '../rules/create-procedure-input-is-valid.rule'

export class CreateProcedureAction extends ProcedureBusinessActionBase<Procedure> {constructor(private input: UserCreateProcedureInput) {
    super('CreateProcedureAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedure({ input: this.input }).pipe
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


