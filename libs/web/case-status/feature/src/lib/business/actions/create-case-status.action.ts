
import {CaseStatusBusinessActionBase} from './case-status.business-action-base'
import {CaseStatus,UserCreateCaseStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCaseStatusInputIsValidRule} from '../rules/create-case-status-input-is-valid.rule'

export class CreateCaseStatusAction extends CaseStatusBusinessActionBase<CaseStatus> {constructor(private input: UserCreateCaseStatusInput) {
    super('CreateCaseStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCaseStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCaseStatus({ input: this.input }).pipe
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


