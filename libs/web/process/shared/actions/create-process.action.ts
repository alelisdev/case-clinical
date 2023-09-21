
import {ProcessBusinessActionBase} from './process.business-action-base'
import {Process,UserCreateProcessInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcessInputIsValidRule} from '../rules/create-process-input-is-valid.rule'

export class CreateProcessAction extends ProcessBusinessActionBase<Process> {
  constructor(private input: UserCreateProcessInput) {
    super('CreateProcessAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcessInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcess({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


