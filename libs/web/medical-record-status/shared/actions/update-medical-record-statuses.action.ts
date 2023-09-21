
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {MedicalRecordStatusBusinessActionBase} from './medical-record-status.business-action-base'
import {MedicalRecordStatusNameIsValidRule} from '../rules/medical-record-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateMedicalRecordStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateMedicalRecordStatusesAction extends MedicalRecordStatusBusinessActionBase<UpdateResult> {

    constructor(private medicalRecordStatuses: UserUpdateMedicalRecordStatusInput[]) {
        super('UpdateMedicalRecordStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalRecordStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalRecordStatuses({ input: { medicalRecordStatuses: this.medicalRecordStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateMedicalRecordStatusAction extends MedicalRecordStatusBusinessActionBase<boolean> {

    constructor(private medicalRecordStatus: UserUpdateMedicalRecordStatusInput, private medicalRecordStatusId: string) {
        super('UpdateMedicalRecordStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalRecordStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.medicalRecordStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalRecordStatus({medicalRecordStatusId: this.medicalRecordStatusId, input: this.medicalRecordStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
