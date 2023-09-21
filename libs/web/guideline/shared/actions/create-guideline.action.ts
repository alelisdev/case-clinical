
import {GuidelineBusinessActionBase} from './guideline.business-action-base'
import {Guideline,UserCreateGuidelineInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateGuidelineInputIsValidRule} from '../rules/create-guideline-input-is-valid.rule'

export class CreateGuidelineAction extends GuidelineBusinessActionBase<Guideline> {
  constructor(private input: UserCreateGuidelineInput) {
    super('CreateGuidelineAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateGuidelineInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateGuideline({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


