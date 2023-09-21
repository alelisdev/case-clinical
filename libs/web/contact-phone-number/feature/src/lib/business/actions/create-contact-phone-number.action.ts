
import {ContactPhoneNumberBusinessActionBase} from './contact-phone-number.business-action-base'
import {ContactPhoneNumber,UserCreateContactPhoneNumberInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContactPhoneNumberInputIsValidRule} from '../rules/create-contact-phone-number-input-is-valid.rule'

export class CreateContactPhoneNumberAction extends ContactPhoneNumberBusinessActionBase<ContactPhoneNumber> {constructor(private input: UserCreateContactPhoneNumberInput) {
    super('CreateContactPhoneNumberAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContactPhoneNumberInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContactPhoneNumber({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


