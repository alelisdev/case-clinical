
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClaimProcedureBusinessActionBase} from './claim-procedure.business-action-base'
import {ClaimProcedureNameIsValidRule} from '../rules/claim-procedure-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClaimProcedureInput} from '@case-clinical/shared/util/sdk';

export class UpdateClaimProceduresAction extends ClaimProcedureBusinessActionBase<boolean> {

    constructor(private claimProcedures: UserUpdateClaimProcedureInput[]) {
        super('UpdateClaimProceduresAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.claimProcedures,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClaimProcedures({ input: { claimProcedures: this.claimProcedures} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateClaimProcedureAction extends ClaimProcedureBusinessActionBase<boolean> {

    constructor(private claimProcedure: UserUpdateClaimProcedureInput, private claimProcedureId: string) {
        super('UpdateClaimProcedureAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.claimProcedure,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.claimProcedureId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClaimProcedure({claimProcedureId: this.claimProcedureId, input: this.claimProcedure }).pipe(
                switchMap(() => of(true))
            )
    }
}
