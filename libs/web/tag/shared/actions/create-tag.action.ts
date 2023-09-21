
import {TagBusinessActionBase} from './tag.business-action-base'
import {Tag,UserCreateTagInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTagInputIsValidRule} from '../rules/create-tag-input-is-valid.rule'

export class CreateTagAction extends TagBusinessActionBase<Tag> {
  constructor(private input: UserCreateTagInput) {
    super('CreateTagAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTagInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTag({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


