
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureBusinessActionBase} from './procedure.business-action-base'
import {ProcedureNameIsValidRule} from '../rules/procedure-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureInput} from '@case-clinical/shared/util/sdk';

export class UpdateProceduresAction extends ProcedureBusinessActionBase<boolean> {

    constructor(private procedures: UserUpdateProcedureInput[]) {
        super('UpdateProceduresAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedures,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedures({ input: { procedures: this.procedures} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateProcedureAction extends ProcedureBusinessActionBase<boolean> {

    constructor(private procedure: UserUpdateProcedureInput, private procedureId: string) {
        super('UpdateProcedureAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedure,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedure({procedureId: this.procedureId, input: this.procedure }).pipe(
                switchMap(() => of(true))
            )
    }
}
