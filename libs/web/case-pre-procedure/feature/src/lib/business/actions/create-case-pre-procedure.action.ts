
import {CasePreProcedureBusinessActionBase} from './case-pre-procedure.business-action-base'
import {CasePreProcedure,UserCreateCasePreProcedureInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCasePreProcedureInputIsValidRule} from '../rules/create-case-pre-procedure-input-is-valid.rule'

export class CreateCasePreProcedureAction extends CasePreProcedureBusinessActionBase<CasePreProcedure> {constructor(private input: UserCreateCasePreProcedureInput) {
    super('CreateCasePreProcedureAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCasePreProcedureInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCasePreProcedure({ input: this.input }).pipe
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


