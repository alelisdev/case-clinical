
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {MedicalRecordBusinessActionBase} from './medical-record.business-action-base'
import {MedicalRecordNameIsValidRule} from '../rules/medical-record-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateMedicalRecordInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateMedicalRecordsAction extends MedicalRecordBusinessActionBase<UpdateResult> {

    constructor(private medicalRecords: UserUpdateMedicalRecordInput[]) {
        super('UpdateMedicalRecordsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalRecords,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalRecords({ input: { medicalRecords: this.medicalRecords} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateMedicalRecordAction extends MedicalRecordBusinessActionBase<boolean> {

    constructor(private medicalRecord: UserUpdateMedicalRecordInput, private medicalRecordId: string) {
        super('UpdateMedicalRecordAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalRecord,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.medicalRecordId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalRecord({medicalRecordId: this.medicalRecordId, input: this.medicalRecord }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
