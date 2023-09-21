
import {CasePreAccidentBusinessActionBase} from './case-pre-accident.business-action-base'
import {CasePreAccident,UserCreateCasePreAccidentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCasePreAccidentInputIsValidRule} from '../rules/create-case-pre-accident-input-is-valid.rule'

export class CreateCasePreAccidentAction extends CasePreAccidentBusinessActionBase<CasePreAccident> {constructor(private input: UserCreateCasePreAccidentInput) {
    super('CreateCasePreAccidentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCasePreAccidentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCasePreAccident({ input: this.input }).pipe
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


