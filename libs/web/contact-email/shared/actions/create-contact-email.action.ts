
import {ContactEmailBusinessActionBase} from './contact-email.business-action-base'
import {ContactEmail,UserCreateContactEmailInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContactEmailInputIsValidRule} from '../rules/create-contact-email-input-is-valid.rule'

export class CreateContactEmailAction extends ContactEmailBusinessActionBase<ContactEmail> {
  constructor(private input: UserCreateContactEmailInput) {
    super('CreateContactEmailAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContactEmailInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContactEmail({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


