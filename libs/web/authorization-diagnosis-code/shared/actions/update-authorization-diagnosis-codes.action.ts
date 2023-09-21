
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AuthorizationDiagnosisCodeBusinessActionBase} from './authorization-diagnosis-code.business-action-base'
import {AuthorizationDiagnosisCodeNameIsValidRule} from '../rules/authorization-diagnosis-code-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAuthorizationDiagnosisCodeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAuthorizationDiagnosisCodesAction extends AuthorizationDiagnosisCodeBusinessActionBase<UpdateResult> {

    constructor(private authorizationDiagnosisCodes: UserUpdateAuthorizationDiagnosisCodeInput[]) {
        super('UpdateAuthorizationDiagnosisCodesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationDiagnosisCodes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationDiagnosisCodes({ input: { authorizationDiagnosisCodes: this.authorizationDiagnosisCodes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAuthorizationDiagnosisCodeAction extends AuthorizationDiagnosisCodeBusinessActionBase<boolean> {

    constructor(private authorizationDiagnosisCode: UserUpdateAuthorizationDiagnosisCodeInput, private authorizationDiagnosisCodeId: string) {
        super('UpdateAuthorizationDiagnosisCodeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationDiagnosisCode,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.authorizationDiagnosisCodeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationDiagnosisCode({authorizationDiagnosisCodeId: this.authorizationDiagnosisCodeId, input: this.authorizationDiagnosisCode }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
