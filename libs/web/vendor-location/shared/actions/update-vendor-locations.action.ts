
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {VendorLocationBusinessActionBase} from './vendor-location.business-action-base'
import {VendorLocationNameIsValidRule} from '../rules/vendor-location-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateVendorLocationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateVendorLocationsAction extends VendorLocationBusinessActionBase<UpdateResult> {

    constructor(private vendorLocations: UserUpdateVendorLocationInput[]) {
        super('UpdateVendorLocationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.vendorLocations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVendorLocations({ input: { vendorLocations: this.vendorLocations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateVendorLocationAction extends VendorLocationBusinessActionBase<boolean> {

    constructor(private vendorLocation: UserUpdateVendorLocationInput, private vendorLocationId: string) {
        super('UpdateVendorLocationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.vendorLocation,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.vendorLocationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVendorLocation({vendorLocationId: this.vendorLocationId, input: this.vendorLocation }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
