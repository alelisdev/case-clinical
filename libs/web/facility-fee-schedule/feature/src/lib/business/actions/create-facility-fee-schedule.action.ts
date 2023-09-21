
import {FacilityFeeScheduleBusinessActionBase} from './facility-fee-schedule.business-action-base'
import {FacilityFeeSchedule,UserCreateFacilityFeeScheduleInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateFacilityFeeScheduleInputIsValidRule} from '../rules/create-facility-fee-schedule-input-is-valid.rule'

export class CreateFacilityFeeScheduleAction extends FacilityFeeScheduleBusinessActionBase<FacilityFeeSchedule> {constructor(private input: UserCreateFacilityFeeScheduleInput) {
    super('CreateFacilityFeeScheduleAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateFacilityFeeScheduleInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateFacilityFeeSchedule({ input: this.input }).pipe
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


