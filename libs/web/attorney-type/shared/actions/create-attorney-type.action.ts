
import {AttorneyTypeBusinessActionBase} from './attorney-type.business-action-base'
import {AttorneyType,UserCreateAttorneyTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAttorneyTypeInputIsValidRule} from '../rules/create-attorney-type-input-is-valid.rule'

export class CreateAttorneyTypeAction extends AttorneyTypeBusinessActionBase<AttorneyType> {
  constructor(private input: UserCreateAttorneyTypeInput) {
    super('CreateAttorneyTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAttorneyTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAttorneyType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


