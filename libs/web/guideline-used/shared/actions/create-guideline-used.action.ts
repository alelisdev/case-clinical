
import {GuidelineUsedBusinessActionBase} from './guideline-used.business-action-base'
import {GuidelineUsed,UserCreateGuidelineUsedInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateGuidelineUsedInputIsValidRule} from '../rules/create-guideline-used-input-is-valid.rule'

export class CreateGuidelineUsedAction extends GuidelineUsedBusinessActionBase<GuidelineUsed> {
  constructor(private input: UserCreateGuidelineUsedInput) {
    super('CreateGuidelineUsedAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateGuidelineUsedInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateGuidelineUsed({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


