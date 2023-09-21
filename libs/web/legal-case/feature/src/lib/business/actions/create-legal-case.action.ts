
import {LegalCaseBusinessActionBase} from './legal-case.business-action-base'
import {LegalCase,UserCreateLegalCaseInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLegalCaseInputIsValidRule} from '../rules/create-legal-case-input-is-valid.rule'

export class CreateLegalCaseAction extends LegalCaseBusinessActionBase<LegalCase> {constructor(private input: UserCreateLegalCaseInput) {
    super('CreateLegalCaseAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLegalCaseInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLegalCase({ input: this.input }).pipe
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


