
import {IsNotNullOrUndefined,CellIdIsValidRule, AreEqual } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AppointmentBusinessActionBase} from './appointment.business-action-base'
import {switchMap} from 'rxjs';
import { Appointment } from '@case-clinical/web/core/data-access';


export class CheckInAppointmentAction extends AppointmentBusinessActionBase<boolean> {

    constructor(private appointment: Appointment) {
        super('CheckInAppointmentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.appointment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.appointment.id,
                true
                )
        ).addRule(
          new AreEqual('currentStatus', 'You can only check confirmed appointments in', this.appointment.appointmentStatus?.name, 'Confirmed', true)
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userCheckInAppointment({appointmentId: this.appointment.id}).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
