
import {AuthorizationStatusBusinessActionBase} from './authorization-status.business-action-base'
import {AuthorizationStatus,UserCreateAuthorizationStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAuthorizationStatusInputIsValidRule} from '../rules/create-authorization-status-input-is-valid.rule'

export class CreateAuthorizationStatusAction extends AuthorizationStatusBusinessActionBase<AuthorizationStatus> {
  constructor(private input: UserCreateAuthorizationStatusInput) {
    super('CreateAuthorizationStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAuthorizationStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


