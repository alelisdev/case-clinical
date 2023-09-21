
import {ProcedureStatusBusinessActionBase} from './procedure-status.business-action-base'
import {ProcedureStatus,UserCreateProcedureStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureStatusInputIsValidRule} from '../rules/create-procedure-status-input-is-valid.rule'

export class CreateProcedureStatusAction extends ProcedureStatusBusinessActionBase<ProcedureStatus> {constructor(private input: UserCreateProcedureStatusInput) {
    super('CreateProcedureStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureStatusInputIsValidRule(
        'InputIsNotNull',
        'The input information is not valid.',
        this.input,
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureStatus({ input: this.input }).pipe
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


