
import {AuthorizationBusinessActionBase} from './authorization.business-action-base'
import {Authorization,UserCreateAuthorizationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAuthorizationInputIsValidRule} from '../rules/create-authorization-input-is-valid.rule'

export class CreateAuthorizationAction extends AuthorizationBusinessActionBase<Authorization> {
  constructor(private input: UserCreateAuthorizationInput) {
    super('CreateAuthorizationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAuthorizationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorization({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


