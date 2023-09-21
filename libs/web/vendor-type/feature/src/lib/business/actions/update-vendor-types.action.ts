
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {VendorTypeBusinessActionBase} from './vendor-type.business-action-base'
import {VendorTypeNameIsValidRule} from '../rules/vendor-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateVendorTypeInput} from '@case-clinical/shared/util/sdk';

export class UpdateVendorTypesAction extends VendorTypeBusinessActionBase<boolean> {

    constructor(private vendorTypes: UserUpdateVendorTypeInput[]) {
        super('UpdateVendorTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.vendorTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVendorTypes({ input: { vendorTypes: this.vendorTypes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateVendorTypeAction extends VendorTypeBusinessActionBase<boolean> {

    constructor(private vendorType: UserUpdateVendorTypeInput, private vendorTypeId: string) {
        super('UpdateVendorTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.vendorType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.vendorTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVendorType({vendorTypeId: this.vendorTypeId, input: this.vendorType }).pipe(
                switchMap(() => of(true))
            )
    }
}
