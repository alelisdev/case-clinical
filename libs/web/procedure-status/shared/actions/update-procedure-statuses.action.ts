
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureStatusBusinessActionBase} from './procedure-status.business-action-base'
import {ProcedureStatusNameIsValidRule} from '../rules/procedure-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureStatusesAction extends ProcedureStatusBusinessActionBase<UpdateResult> {

    constructor(private procedureStatuses: UserUpdateProcedureStatusInput[]) {
        super('UpdateProcedureStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureStatuses({ input: { procedureStatuses: this.procedureStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateProcedureStatusAction extends ProcedureStatusBusinessActionBase<boolean> {

    constructor(private procedureStatus: UserUpdateProcedureStatusInput, private procedureStatusId: string) {
        super('UpdateProcedureStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureStatus({procedureStatusId: this.procedureStatusId, input: this.procedureStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
