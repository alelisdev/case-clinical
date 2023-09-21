
import {CategoryBusinessActionBase} from './category.business-action-base'
import {Category,UserCreateCategoryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCategoryInputIsValidRule} from '../rules/create-category-input-is-valid.rule'

export class CreateCategoryAction extends CategoryBusinessActionBase<Category> {constructor(private input: UserCreateCategoryInput) {
    super('CreateCategoryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCategoryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCategory({ input: this.input }).pipe
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


