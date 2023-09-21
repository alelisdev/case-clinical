
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PatientTreatmentStatusBusinessActionBase} from './patient-treatment-status.business-action-base'
import {PatientTreatmentStatusNameIsValidRule} from '../rules/patient-treatment-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePatientTreatmentStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePatientTreatmentStatusesAction extends PatientTreatmentStatusBusinessActionBase<UpdateResult> {

    constructor(private patientTreatmentStatuses: UserUpdatePatientTreatmentStatusInput[]) {
        super('UpdatePatientTreatmentStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patientTreatmentStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatientTreatmentStatuses({ input: { patientTreatmentStatuses: this.patientTreatmentStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePatientTreatmentStatusAction extends PatientTreatmentStatusBusinessActionBase<boolean> {

    constructor(private patientTreatmentStatus: UserUpdatePatientTreatmentStatusInput, private patientTreatmentStatusId: string) {
        super('UpdatePatientTreatmentStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patientTreatmentStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.patientTreatmentStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatientTreatmentStatus({patientTreatmentStatusId: this.patientTreatmentStatusId, input: this.patientTreatmentStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
