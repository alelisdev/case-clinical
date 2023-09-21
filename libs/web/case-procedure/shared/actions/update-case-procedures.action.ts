
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CaseProcedureBusinessActionBase} from './case-procedure.business-action-base'
import {CaseProcedureNameIsValidRule} from '../rules/case-procedure-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCaseProcedureInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateCaseProceduresAction extends CaseProcedureBusinessActionBase<UpdateResult> {

    constructor(private caseProcedures: UserUpdateCaseProcedureInput[]) {
        super('UpdateCaseProceduresAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseProcedures,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseProcedures({ input: { caseProcedures: this.caseProcedures} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateCaseProcedureAction extends CaseProcedureBusinessActionBase<boolean> {

    constructor(private caseProcedure: UserUpdateCaseProcedureInput, private caseProcedureId: string) {
        super('UpdateCaseProcedureAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseProcedure,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.caseProcedureId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseProcedure({caseProcedureId: this.caseProcedureId, input: this.caseProcedure }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
