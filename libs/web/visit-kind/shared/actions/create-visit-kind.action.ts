
import {VisitKindBusinessActionBase} from './visit-kind.business-action-base'
import {VisitKind,UserCreateVisitKindInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateVisitKindInputIsValidRule} from '../rules/create-visit-kind-input-is-valid.rule'

export class CreateVisitKindAction extends VisitKindBusinessActionBase<VisitKind> {
  constructor(private input: UserCreateVisitKindInput) {
    super('CreateVisitKindAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateVisitKindInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateVisitKind({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


