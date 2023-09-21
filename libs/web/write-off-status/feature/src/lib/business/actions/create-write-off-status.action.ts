
import {WriteOffStatusBusinessActionBase} from './write-off-status.business-action-base'
import {WriteOffStatus,UserCreateWriteOffStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateWriteOffStatusInputIsValidRule} from '../rules/create-write-off-status-input-is-valid.rule'

export class CreateWriteOffStatusAction extends WriteOffStatusBusinessActionBase<WriteOffStatus> {constructor(private input: UserCreateWriteOffStatusInput) {
    super('CreateWriteOffStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateWriteOffStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateWriteOffStatus({ input: this.input }).pipe
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


