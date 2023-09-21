
import {AuthorizationCategoryBusinessActionBase} from './authorization-category.business-action-base'
import {AuthorizationCategory,UserCreateAuthorizationCategoryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAuthorizationCategoryInputIsValidRule} from '../rules/create-authorization-category-input-is-valid.rule'

export class CreateAuthorizationCategoryAction extends AuthorizationCategoryBusinessActionBase<AuthorizationCategory> {
  constructor(private input: UserCreateAuthorizationCategoryInput) {
    super('CreateAuthorizationCategoryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAuthorizationCategoryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAuthorizationCategory({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


