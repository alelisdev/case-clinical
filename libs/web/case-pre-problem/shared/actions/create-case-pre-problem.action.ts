
import {CasePreProblemBusinessActionBase} from './case-pre-problem.business-action-base'
import {CasePreProblem,UserCreateCasePreProblemInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCasePreProblemInputIsValidRule} from '../rules/create-case-pre-problem-input-is-valid.rule'

export class CreateCasePreProblemAction extends CasePreProblemBusinessActionBase<CasePreProblem> {
  constructor(private input: UserCreateCasePreProblemInput) {
    super('CreateCasePreProblemAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCasePreProblemInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCasePreProblem({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


