
import {AppointmentStatusBusinessActionBase} from './appointment-status.business-action-base'
import {AppointmentStatus,UserCreateAppointmentStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAppointmentStatusInputIsValidRule} from '../rules/create-appointment-status-input-is-valid.rule'

export class CreateAppointmentStatusAction extends AppointmentStatusBusinessActionBase<AppointmentStatus> {
  constructor(private input: UserCreateAppointmentStatusInput) {
    super('CreateAppointmentStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAppointmentStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAppointmentStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


