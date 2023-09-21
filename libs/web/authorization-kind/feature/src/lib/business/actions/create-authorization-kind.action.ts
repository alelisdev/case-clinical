
import {AuthorizationKindBusinessActionBase} from './authorization-kind.business-action-base'
import {AuthorizationKind,UserCreateAuthorizationKindInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAuthorizationKindInputIsValidRule} from '../rules/create-authorization-kind-input-is-valid.rule'

export class CreateAuthorizationKindAction extends AuthorizationKindBusinessActionBase<AuthorizationKind> {constructor(private input: UserCreateAuthorizationKindInput) {
    super('CreateAuthorizationKindAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAuthorizationKindInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationKind({ input: this.input }).pipe
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


