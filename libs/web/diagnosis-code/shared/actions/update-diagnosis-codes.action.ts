
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {DiagnosisCodeBusinessActionBase} from './diagnosis-code.business-action-base'
import {DiagnosisCodeNameIsValidRule} from '../rules/diagnosis-code-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateDiagnosisCodeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateDiagnosisCodesAction extends DiagnosisCodeBusinessActionBase<UpdateResult> {

    constructor(private diagnosisCodes: UserUpdateDiagnosisCodeInput[]) {
        super('UpdateDiagnosisCodesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.diagnosisCodes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateDiagnosisCodes({ input: { diagnosisCodes: this.diagnosisCodes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateDiagnosisCodeAction extends DiagnosisCodeBusinessActionBase<boolean> {

    constructor(private diagnosisCode: UserUpdateDiagnosisCodeInput, private diagnosisCodeId: string) {
        super('UpdateDiagnosisCodeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.diagnosisCode,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.diagnosisCodeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateDiagnosisCode({diagnosisCodeId: this.diagnosisCodeId, input: this.diagnosisCode }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
