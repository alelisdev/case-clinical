
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthorizationDiagnosisCodeBusinessActionBase} from './prior-authorization-diagnosis-code.business-action-base'
import {PriorAuthorizationDiagnosisCodeNameIsValidRule} from '../rules/prior-authorization-diagnosis-code-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthorizationDiagnosisCodeInput} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthorizationDiagnosisCodesAction extends PriorAuthorizationDiagnosisCodeBusinessActionBase<boolean> {

    constructor(private priorAuthorizationDiagnosisCodes: UserUpdatePriorAuthorizationDiagnosisCodeInput[]) {
        super('UpdatePriorAuthorizationDiagnosisCodesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationDiagnosisCodes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationDiagnosisCodes({ input: { priorAuthorizationDiagnosisCodes: this.priorAuthorizationDiagnosisCodes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePriorAuthorizationDiagnosisCodeAction extends PriorAuthorizationDiagnosisCodeBusinessActionBase<boolean> {

    constructor(private priorAuthorizationDiagnosisCode: UserUpdatePriorAuthorizationDiagnosisCodeInput, private priorAuthorizationDiagnosisCodeId: string) {
        super('UpdatePriorAuthorizationDiagnosisCodeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationDiagnosisCode,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthorizationDiagnosisCodeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationDiagnosisCode({priorAuthorizationDiagnosisCodeId: this.priorAuthorizationDiagnosisCodeId, input: this.priorAuthorizationDiagnosisCode }).pipe(
                switchMap(() => of(true))
            )
    }
}
