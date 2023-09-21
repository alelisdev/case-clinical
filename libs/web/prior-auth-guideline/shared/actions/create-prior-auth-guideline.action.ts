
import {PriorAuthGuidelineBusinessActionBase} from './prior-auth-guideline.business-action-base'
import {PriorAuthGuideline,UserCreatePriorAuthGuidelineInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthGuidelineInputIsValidRule} from '../rules/create-prior-auth-guideline-input-is-valid.rule'

export class CreatePriorAuthGuidelineAction extends PriorAuthGuidelineBusinessActionBase<PriorAuthGuideline> {
  constructor(private input: UserCreatePriorAuthGuidelineInput) {
    super('CreatePriorAuthGuidelineAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthGuidelineInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthGuideline({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


