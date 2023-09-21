
import {CostCategoryBusinessActionBase} from './cost-category.business-action-base'
import {CostCategory,UserCreateCostCategoryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCostCategoryInputIsValidRule} from '../rules/create-cost-category-input-is-valid.rule'

export class CreateCostCategoryAction extends CostCategoryBusinessActionBase<CostCategory> {
  constructor(private input: UserCreateCostCategoryInput) {
    super('CreateCostCategoryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCostCategoryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCostCategory({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


