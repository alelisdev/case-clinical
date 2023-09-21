
import {WriteOffBusinessActionBase} from './write-off.business-action-base'
import {WriteOff,UserCreateWriteOffInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateWriteOffInputIsValidRule} from '../rules/create-write-off-input-is-valid.rule'

export class CreateWriteOffAction extends WriteOffBusinessActionBase<WriteOff> {constructor(private input: UserCreateWriteOffInput) {
    super('CreateWriteOffAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateWriteOffInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateWriteOff({ input: this.input }).pipe
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


