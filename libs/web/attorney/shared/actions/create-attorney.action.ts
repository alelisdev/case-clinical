
import {AttorneyBusinessActionBase} from './attorney.business-action-base'
import {Attorney,UserCreateAttorneyInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAttorneyInputIsValidRule} from '../rules/create-attorney-input-is-valid.rule'

export class CreateAttorneyAction extends AttorneyBusinessActionBase<Attorney> {
  constructor(private input: UserCreateAttorneyInput) {
    super('CreateAttorneyAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAttorneyInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAttorney({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


