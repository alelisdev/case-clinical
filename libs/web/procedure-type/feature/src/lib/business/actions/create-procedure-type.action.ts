
import {ProcedureTypeBusinessActionBase} from './procedure-type.business-action-base'
import {ProcedureType,UserCreateProcedureTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureTypeInputIsValidRule} from '../rules/create-procedure-type-input-is-valid.rule'

export class CreateProcedureTypeAction extends ProcedureTypeBusinessActionBase<ProcedureType> {constructor(private input: UserCreateProcedureTypeInput) {
    super('CreateProcedureTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureType({ input: this.input }).pipe
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


