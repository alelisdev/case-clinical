
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureVendorStatusBusinessActionBase} from './procedure-vendor-status.business-action-base'
import {ProcedureVendorStatusNameIsValidRule} from '../rules/procedure-vendor-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureVendorStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureVendorStatusesAction extends ProcedureVendorStatusBusinessActionBase<UpdateResult> {

    constructor(private procedureVendorStatuses: UserUpdateProcedureVendorStatusInput[]) {
        super('UpdateProcedureVendorStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureVendorStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureVendorStatuses({ input: { procedureVendorStatuses: this.procedureVendorStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateProcedureVendorStatusAction extends ProcedureVendorStatusBusinessActionBase<boolean> {

    constructor(private procedureVendorStatus: UserUpdateProcedureVendorStatusInput, private procedureVendorStatusId: string) {
        super('UpdateProcedureVendorStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureVendorStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureVendorStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureVendorStatus({procedureVendorStatusId: this.procedureVendorStatusId, input: this.procedureVendorStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
