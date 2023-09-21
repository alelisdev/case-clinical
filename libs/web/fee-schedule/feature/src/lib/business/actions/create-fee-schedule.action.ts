
import {FeeScheduleBusinessActionBase} from './fee-schedule.business-action-base'
import {FeeSchedule,UserCreateFeeScheduleInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateFeeScheduleInputIsValidRule} from '../rules/create-fee-schedule-input-is-valid.rule'

export class CreateFeeScheduleAction extends FeeScheduleBusinessActionBase<FeeSchedule> {constructor(private input: UserCreateFeeScheduleInput) {
    super('CreateFeeScheduleAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateFeeScheduleInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateFeeSchedule({ input: this.input }).pipe
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


