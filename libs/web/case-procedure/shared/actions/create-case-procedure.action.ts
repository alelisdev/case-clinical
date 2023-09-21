
import {CaseProcedureBusinessActionBase} from './case-procedure.business-action-base'
import {CaseProcedure,UserCreateCaseProcedureInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCaseProcedureInputIsValidRule} from '../rules/create-case-procedure-input-is-valid.rule'

export class CreateCaseProcedureAction extends CaseProcedureBusinessActionBase<CaseProcedure> {
  constructor(private input: UserCreateCaseProcedureInput) {
    super('CreateCaseProcedureAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCaseProcedureInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCaseProcedure({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


