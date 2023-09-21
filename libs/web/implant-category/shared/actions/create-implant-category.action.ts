
import {ImplantCategoryBusinessActionBase} from './implant-category.business-action-base'
import {ImplantCategory,UserCreateImplantCategoryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateImplantCategoryInputIsValidRule} from '../rules/create-implant-category-input-is-valid.rule'

export class CreateImplantCategoryAction extends ImplantCategoryBusinessActionBase<ImplantCategory> {
  constructor(private input: UserCreateImplantCategoryInput) {
    super('CreateImplantCategoryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateImplantCategoryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateImplantCategory({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


