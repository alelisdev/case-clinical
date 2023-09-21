
import {UserCourseProgressBusinessActionBase} from './user-course-progress.business-action-base'
import {UserCourseProgress,UserCreateUserCourseProgressInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateUserCourseProgressInputIsValidRule} from '../rules/create-user-course-progress-input-is-valid.rule'

export class CreateUserCourseProgressAction extends UserCourseProgressBusinessActionBase<UserCourseProgress> {
  constructor(private input: UserCreateUserCourseProgressInput) {
    super('CreateUserCourseProgressAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateUserCourseProgressInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateUserCourseProgress({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


