
import {AuthorizationTypeBusinessActionBase} from './authorization-type.business-action-base'
import {AuthorizationType,UserCreateAuthorizationTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAuthorizationTypeInputIsValidRule} from '../rules/create-authorization-type-input-is-valid.rule'

export class CreateAuthorizationTypeAction extends AuthorizationTypeBusinessActionBase<AuthorizationType> {
  constructor(private input: UserCreateAuthorizationTypeInput) {
    super('CreateAuthorizationTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAuthorizationTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


