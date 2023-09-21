
import {SeverityBusinessActionBase} from './severity.business-action-base'
import {Severity,UserCreateSeverityInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateSeverityInputIsValidRule} from '../rules/create-severity-input-is-valid.rule'

export class CreateSeverityAction extends SeverityBusinessActionBase<Severity> {
  constructor(private input: UserCreateSeverityInput) {
    super('CreateSeverityAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateSeverityInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateSeverity({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


