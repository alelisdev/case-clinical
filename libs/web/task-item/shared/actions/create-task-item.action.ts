
import {TaskItemBusinessActionBase} from './task-item.business-action-base'
import {TaskItem,UserCreateTaskItemInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTaskItemInputIsValidRule} from '../rules/create-task-item-input-is-valid.rule'

export class CreateTaskItemAction extends TaskItemBusinessActionBase<TaskItem> {
  constructor(private input: UserCreateTaskItemInput) {
    super('CreateTaskItemAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTaskItemInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTaskItem({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


