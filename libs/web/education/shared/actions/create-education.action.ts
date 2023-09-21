
import {EducationBusinessActionBase} from './education.business-action-base'
import {Education,UserCreateEducationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateEducationInputIsValidRule} from '../rules/create-education-input-is-valid.rule'

export class CreateEducationAction extends EducationBusinessActionBase<Education> {
  constructor(private input: UserCreateEducationInput) {
    super('CreateEducationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateEducationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateEducation({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


