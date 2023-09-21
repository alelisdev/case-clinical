
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase} from './procedure-or-treatment-request-diagnosis-code.business-action-base'
import {ProcedureOrTreatmentRequestDiagnosisCodeNameIsValidRule} from '../rules/procedure-or-treatment-request-diagnosis-code-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureOrTreatmentRequestDiagnosisCodesAction extends ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase<UpdateResult> {

    constructor(private procedureOrTreatmentRequestDiagnosisCodes: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]) {
        super('UpdateProcedureOrTreatmentRequestDiagnosisCodesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureOrTreatmentRequestDiagnosisCodes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestDiagnosisCodes({ input: { procedureOrTreatmentRequestDiagnosisCodes: this.procedureOrTreatmentRequestDiagnosisCodes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateProcedureOrTreatmentRequestDiagnosisCodeAction extends ProcedureOrTreatmentRequestDiagnosisCodeBusinessActionBase<boolean> {

    constructor(private procedureOrTreatmentRequestDiagnosisCode: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, private procedureOrTreatmentRequestDiagnosisCodeId: string) {
        super('UpdateProcedureOrTreatmentRequestDiagnosisCodeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureOrTreatmentRequestDiagnosisCode,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureOrTreatmentRequestDiagnosisCodeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestDiagnosisCode({procedureOrTreatmentRequestDiagnosisCodeId: this.procedureOrTreatmentRequestDiagnosisCodeId, input: this.procedureOrTreatmentRequestDiagnosisCode }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
