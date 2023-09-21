
import {AppointmentBusinessActionBase} from './appointment.business-action-base'
import {Appointment,UserCreateAppointmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAppointmentInputIsValidRule} from '../rules/create-appointment-input-is-valid.rule'

export class CreateAppointmentAction extends AppointmentBusinessActionBase<Appointment> {constructor(private input: UserCreateAppointmentInput) {
    super('CreateAppointmentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAppointmentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAppointment({ input: this.input }).pipe
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


