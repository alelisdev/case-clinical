
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PatientBusinessActionBase} from './patient.business-action-base'
import {PatientNameIsValidRule} from '../rules/patient-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePatientInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePatientsAction extends PatientBusinessActionBase<UpdateResult> {

    constructor(private patients: UserUpdatePatientInput[]) {
        super('UpdatePatientsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patients,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatients({ input: { patients: this.patients} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePatientAction extends PatientBusinessActionBase<boolean> {

    constructor(private patient: UserUpdatePatientInput, private patientId: string) {
        super('UpdatePatientAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.patient,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.patientId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePatient({patientId: this.patientId, input: this.patient }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
