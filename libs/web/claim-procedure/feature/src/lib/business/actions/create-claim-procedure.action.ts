
import {ClaimProcedureBusinessActionBase} from './claim-procedure.business-action-base'
import {ClaimProcedure,UserCreateClaimProcedureInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClaimProcedureInputIsValidRule} from '../rules/create-claim-procedure-input-is-valid.rule'

export class CreateClaimProcedureAction extends ClaimProcedureBusinessActionBase<ClaimProcedure> {constructor(private input: UserCreateClaimProcedureInput) {
    super('CreateClaimProcedureAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClaimProcedureInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClaimProcedure({ input: this.input }).pipe
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


