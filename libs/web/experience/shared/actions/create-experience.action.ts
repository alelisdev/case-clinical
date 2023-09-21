
import {ExperienceBusinessActionBase} from './experience.business-action-base'
import {Experience,UserCreateExperienceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateExperienceInputIsValidRule} from '../rules/create-experience-input-is-valid.rule'

export class CreateExperienceAction extends ExperienceBusinessActionBase<Experience> {
  constructor(private input: UserCreateExperienceInput) {
    super('CreateExperienceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateExperienceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateExperience({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


