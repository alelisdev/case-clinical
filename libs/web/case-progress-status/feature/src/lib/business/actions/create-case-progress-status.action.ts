
import {CaseProgressStatusBusinessActionBase} from './case-progress-status.business-action-base'
import {CaseProgressStatus,UserCreateCaseProgressStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCaseProgressStatusInputIsValidRule} from '../rules/create-case-progress-status-input-is-valid.rule'

export class CreateCaseProgressStatusAction extends CaseProgressStatusBusinessActionBase<CaseProgressStatus> {constructor(private input: UserCreateCaseProgressStatusInput) {
    super('CreateCaseProgressStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCaseProgressStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCaseProgressStatus({ input: this.input }).pipe
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


