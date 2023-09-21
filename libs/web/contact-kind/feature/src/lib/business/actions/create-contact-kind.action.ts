
import {ContactKindBusinessActionBase} from './contact-kind.business-action-base'
import {ContactKind,UserCreateContactKindInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContactKindInputIsValidRule} from '../rules/create-contact-kind-input-is-valid.rule'

export class CreateContactKindAction extends ContactKindBusinessActionBase<ContactKind> {constructor(private input: UserCreateContactKindInput) {
    super('CreateContactKindAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContactKindInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContactKind({ input: this.input }).pipe
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


