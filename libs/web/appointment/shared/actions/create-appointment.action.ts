
import {AppointmentBusinessActionBase} from './appointment.business-action-base'
import {Appointment,UserCreateAppointmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAppointmentInputIsValidRule} from '../rules/create-appointment-input-is-valid.rule'
import { CompareDatesLessRule } from '@schema-driven/rules-engine'
export class CreateAppointmentAction extends AppointmentBusinessActionBase<Appointment> {
  constructor(private input: UserCreateAppointmentInput) {
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

    this.validationContext.addRule(
        new CompareDatesLessRule(
          'AppointmentDateTimeIsBeforeCheckInDateTime',
          'CheckIn DateTime should be after Appointment DateTime',
          this.input.appointmentDateAndTime,
          this.input.checkedInDateTime,
        )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAppointment({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


