
import {ProcedureSiteBusinessActionBase} from './procedure-site.business-action-base'
import {ProcedureSite,UserCreateProcedureSiteInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureSiteInputIsValidRule} from '../rules/create-procedure-site-input-is-valid.rule'

export class CreateProcedureSiteAction extends ProcedureSiteBusinessActionBase<ProcedureSite> {constructor(private input: UserCreateProcedureSiteInput) {
    super('CreateProcedureSiteAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureSiteInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureSite({ input: this.input }).pipe
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


