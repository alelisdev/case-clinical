
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AppointmentStatusBusinessActionBase} from './appointment-status.business-action-base'
import {AppointmentStatusNameIsValidRule} from '../rules/appointment-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAppointmentStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAppointmentStatusesAction extends AppointmentStatusBusinessActionBase<UpdateResult> {

    constructor(private appointmentStatuses: UserUpdateAppointmentStatusInput[]) {
        super('UpdateAppointmentStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.appointmentStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAppointmentStatuses({ input: { appointmentStatuses: this.appointmentStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAppointmentStatusAction extends AppointmentStatusBusinessActionBase<boolean> {

    constructor(private appointmentStatus: UserUpdateAppointmentStatusInput, private appointmentStatusId: string) {
        super('UpdateAppointmentStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.appointmentStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.appointmentStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAppointmentStatus({appointmentStatusId: this.appointmentStatusId, input: this.appointmentStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
