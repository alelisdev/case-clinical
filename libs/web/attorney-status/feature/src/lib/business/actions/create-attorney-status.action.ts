
import {AttorneyStatusBusinessActionBase} from './attorney-status.business-action-base'
import {AttorneyStatus,UserCreateAttorneyStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAttorneyStatusInputIsValidRule} from '../rules/create-attorney-status-input-is-valid.rule'

export class CreateAttorneyStatusAction extends AttorneyStatusBusinessActionBase<AttorneyStatus> {constructor(private input: UserCreateAttorneyStatusInput) {
    super('CreateAttorneyStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAttorneyStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAttorneyStatus({ input: this.input }).pipe
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


