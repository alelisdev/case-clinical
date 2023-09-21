
import {AwardBusinessActionBase} from './award.business-action-base'
import {Award,UserCreateAwardInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAwardInputIsValidRule} from '../rules/create-award-input-is-valid.rule'

export class CreateAwardAction extends AwardBusinessActionBase<Award> {
  constructor(private input: UserCreateAwardInput) {
    super('CreateAwardAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAwardInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAward({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


