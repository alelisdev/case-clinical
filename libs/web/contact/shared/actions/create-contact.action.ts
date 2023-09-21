
import {ContactBusinessActionBase} from './contact.business-action-base'
import {Contact,UserCreateContactInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContactInputIsValidRule} from '../rules/create-contact-input-is-valid.rule'

export class CreateContactAction extends ContactBusinessActionBase<Contact> {
  constructor(private input: UserCreateContactInput) {
    super('CreateContactAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContactInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContact({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


