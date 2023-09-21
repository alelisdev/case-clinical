
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureVendorBusinessActionBase} from './procedure-vendor.business-action-base'
import {ProcedureVendorNameIsValidRule} from '../rules/procedure-vendor-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureVendorInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureVendorsAction extends ProcedureVendorBusinessActionBase<UpdateResult> {

    constructor(private procedureVendors: UserUpdateProcedureVendorInput[]) {
        super('UpdateProcedureVendorsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureVendors,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureVendors({ input: { procedureVendors: this.procedureVendors} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateProcedureVendorAction extends ProcedureVendorBusinessActionBase<boolean> {

    constructor(private procedureVendor: UserUpdateProcedureVendorInput, private procedureVendorId: string) {
        super('UpdateProcedureVendorAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureVendor,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureVendorId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureVendor({procedureVendorId: this.procedureVendorId, input: this.procedureVendor }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
