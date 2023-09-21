
import {ContactTagBusinessActionBase} from './contact-tag.business-action-base'
import {ContactTag,UserCreateContactTagInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContactTagInputIsValidRule} from '../rules/create-contact-tag-input-is-valid.rule'

export class CreateContactTagAction extends ContactTagBusinessActionBase<ContactTag> {
  constructor(private input: UserCreateContactTagInput) {
    super('CreateContactTagAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContactTagInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContactTag({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


