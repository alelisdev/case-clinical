
import {CasePreInjuryBusinessActionBase} from './case-pre-injury.business-action-base'
import {CasePreInjury,UserCreateCasePreInjuryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCasePreInjuryInputIsValidRule} from '../rules/create-case-pre-injury-input-is-valid.rule'

export class CreateCasePreInjuryAction extends CasePreInjuryBusinessActionBase<CasePreInjury> {constructor(private input: UserCreateCasePreInjuryInput) {
    super('CreateCasePreInjuryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCasePreInjuryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCasePreInjury({ input: this.input }).pipe
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


