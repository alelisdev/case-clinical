
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule, AreEqual, AreNotEqual } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AppointmentBusinessActionBase} from './appointment.business-action-base'
import {AppointmentNameIsValidRule} from '../rules/appointment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import { Appointment } from '@case-clinical/web/core/data-access';


export class CancelAppointmentAction extends AppointmentBusinessActionBase<Appointment> {

    constructor(private appointment: Appointment) {
        super('CancelAppointmentAction')
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
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userCancelAppointment({appointmentId: this.appointment.id}).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
