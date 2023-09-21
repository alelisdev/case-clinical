
import {TaskTagBusinessActionBase} from './task-tag.business-action-base'
import {TaskTag,UserCreateTaskTagInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTaskTagInputIsValidRule} from '../rules/create-task-tag-input-is-valid.rule'

export class CreateTaskTagAction extends TaskTagBusinessActionBase<TaskTag> {
  constructor(private input: UserCreateTaskTagInput) {
    super('CreateTaskTagAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTaskTagInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTaskTag({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


