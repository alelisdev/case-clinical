
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureTypeBusinessActionBase} from './procedure-type.business-action-base'
import {ProcedureTypeNameIsValidRule} from '../rules/procedure-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureTypeInput} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureTypesAction extends ProcedureTypeBusinessActionBase<boolean> {

    constructor(private procedureTypes: UserUpdateProcedureTypeInput[]) {
        super('UpdateProcedureTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureTypes({ input: { procedureTypes: this.procedureTypes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateProcedureTypeAction extends ProcedureTypeBusinessActionBase<boolean> {

    constructor(private procedureType: UserUpdateProcedureTypeInput, private procedureTypeId: string) {
        super('UpdateProcedureTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureType({procedureTypeId: this.procedureTypeId, input: this.procedureType }).pipe(
                switchMap(() => of(true))
            )
    }
}
