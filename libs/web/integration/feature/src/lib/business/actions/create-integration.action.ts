
import {IntegrationBusinessActionBase} from './integration.business-action-base'
import {Integration,UserCreateIntegrationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateIntegrationInputIsValidRule} from '../rules/create-integration-input-is-valid.rule'

export class CreateIntegrationAction extends IntegrationBusinessActionBase<Integration> {constructor(private input: UserCreateIntegrationInput) {
    super('CreateIntegrationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateIntegrationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateIntegration({ input: this.input }).pipe
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


