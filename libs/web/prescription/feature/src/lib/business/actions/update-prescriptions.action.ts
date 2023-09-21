
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PrescriptionBusinessActionBase} from './prescription.business-action-base'
import {PrescriptionNameIsValidRule} from '../rules/prescription-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePrescriptionInput} from '@case-clinical/shared/util/sdk';

export class UpdatePrescriptionsAction extends PrescriptionBusinessActionBase<boolean> {

    constructor(private prescriptions: UserUpdatePrescriptionInput[]) {
        super('UpdatePrescriptionsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.prescriptions,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePrescriptions({ input: { prescriptions: this.prescriptions} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePrescriptionAction extends PrescriptionBusinessActionBase<boolean> {

    constructor(private prescription: UserUpdatePrescriptionInput, private prescriptionId: string) {
        super('UpdatePrescriptionAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.prescription,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.prescriptionId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePrescription({prescriptionId: this.prescriptionId, input: this.prescription }).pipe(
                switchMap(() => of(true))
            )
    }
}
