
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {VendorBusinessActionBase} from './vendor.business-action-base'
import {VendorNameIsValidRule} from '../rules/vendor-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateVendorInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateVendorsAction extends VendorBusinessActionBase<UpdateResult> {

    constructor(private vendors: UserUpdateVendorInput[]) {
        super('UpdateVendorsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.vendors,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVendors({ input: { vendors: this.vendors} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateVendorAction extends VendorBusinessActionBase<boolean> {

    constructor(private vendor: UserUpdateVendorInput, private vendorId: string) {
        super('UpdateVendorAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.vendor,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.vendorId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVendor({vendorId: this.vendorId, input: this.vendor }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
