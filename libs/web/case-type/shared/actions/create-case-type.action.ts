
import {CaseTypeBusinessActionBase} from './case-type.business-action-base'
import {CaseType,UserCreateCaseTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCaseTypeInputIsValidRule} from '../rules/create-case-type-input-is-valid.rule'

export class CreateCaseTypeAction extends CaseTypeBusinessActionBase<CaseType> {
  constructor(private input: UserCreateCaseTypeInput) {
    super('CreateCaseTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCaseTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCaseType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


