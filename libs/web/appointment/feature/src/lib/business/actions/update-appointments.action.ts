
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AppointmentBusinessActionBase} from './appointment.business-action-base'
import {AppointmentNameIsValidRule} from '../rules/appointment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAppointmentInput} from '@case-clinical/shared/util/sdk';

export class UpdateAppointmentsAction extends AppointmentBusinessActionBase<boolean> {

    constructor(private appointments: UserUpdateAppointmentInput[]) {
        super('UpdateAppointmentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.appointments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAppointments({ input: { appointments: this.appointments} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateAppointmentAction extends AppointmentBusinessActionBase<boolean> {

    constructor(private appointment: UserUpdateAppointmentInput, private appointmentId: string) {
        super('UpdateAppointmentAction')
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
                this.appointmentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAppointment({appointmentId: this.appointmentId, input: this.appointment }).pipe(
                switchMap(() => of(true))
            )
    }
}
