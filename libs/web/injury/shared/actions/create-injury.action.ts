
import {InjuryBusinessActionBase} from './injury.business-action-base'
import {Injury,UserCreateInjuryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateInjuryInputIsValidRule} from '../rules/create-injury-input-is-valid.rule'

export class CreateInjuryAction extends InjuryBusinessActionBase<Injury> {
  constructor(private input: UserCreateInjuryInput) {
    super('CreateInjuryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateInjuryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateInjury({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


