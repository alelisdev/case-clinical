
import {PriorMedsToDateBusinessActionBase} from './prior-meds-to-date.business-action-base'
import {PriorMedsToDate,UserCreatePriorMedsToDateInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorMedsToDateInputIsValidRule} from '../rules/create-prior-meds-to-date-input-is-valid.rule'

export class CreatePriorMedsToDateAction extends PriorMedsToDateBusinessActionBase<PriorMedsToDate> {
  constructor(private input: UserCreatePriorMedsToDateInput) {
    super('CreatePriorMedsToDateAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorMedsToDateInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorMedsToDate({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


