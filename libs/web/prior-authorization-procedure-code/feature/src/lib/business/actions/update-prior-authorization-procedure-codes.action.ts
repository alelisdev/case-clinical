
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthorizationProcedureCodeBusinessActionBase} from './prior-authorization-procedure-code.business-action-base'
import {PriorAuthorizationProcedureCodeNameIsValidRule} from '../rules/prior-authorization-procedure-code-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthorizationProcedureCodeInput} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthorizationProcedureCodesAction extends PriorAuthorizationProcedureCodeBusinessActionBase<boolean> {

    constructor(private priorAuthorizationProcedureCodes: UserUpdatePriorAuthorizationProcedureCodeInput[]) {
        super('UpdatePriorAuthorizationProcedureCodesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationProcedureCodes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationProcedureCodes({ input: { priorAuthorizationProcedureCodes: this.priorAuthorizationProcedureCodes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePriorAuthorizationProcedureCodeAction extends PriorAuthorizationProcedureCodeBusinessActionBase<boolean> {

    constructor(private priorAuthorizationProcedureCode: UserUpdatePriorAuthorizationProcedureCodeInput, private priorAuthorizationProcedureCodeId: string) {
        super('UpdatePriorAuthorizationProcedureCodeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationProcedureCode,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthorizationProcedureCodeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationProcedureCode({priorAuthorizationProcedureCodeId: this.priorAuthorizationProcedureCodeId, input: this.priorAuthorizationProcedureCode }).pipe(
                switchMap(() => of(true))
            )
    }
}
