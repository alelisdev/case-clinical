
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CasePreProcedureBusinessActionBase} from './case-pre-procedure.business-action-base'
import {CasePreProcedureNameIsValidRule} from '../rules/case-pre-procedure-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCasePreProcedureInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateCasePreProceduresAction extends CasePreProcedureBusinessActionBase<UpdateResult> {

    constructor(private casePreProcedures: UserUpdateCasePreProcedureInput[]) {
        super('UpdateCasePreProceduresAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreProcedures,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreProcedures({ input: { casePreProcedures: this.casePreProcedures} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateCasePreProcedureAction extends CasePreProcedureBusinessActionBase<boolean> {

    constructor(private casePreProcedure: UserUpdateCasePreProcedureInput, private casePreProcedureId: string) {
        super('UpdateCasePreProcedureAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreProcedure,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.casePreProcedureId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreProcedure({casePreProcedureId: this.casePreProcedureId, input: this.casePreProcedure }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
