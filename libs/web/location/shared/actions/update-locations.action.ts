
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LocationBusinessActionBase} from './location.business-action-base'
import {LocationNameIsValidRule} from '../rules/location-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLocationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLocationsAction extends LocationBusinessActionBase<UpdateResult> {

    constructor(private locations: UserUpdateLocationInput[]) {
        super('UpdateLocationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.locations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLocations({ input: { locations: this.locations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLocationAction extends LocationBusinessActionBase<boolean> {

    constructor(private location: UserUpdateLocationInput, private locationId: string) {
        super('UpdateLocationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.location,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.locationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLocation({locationId: this.locationId, input: this.location }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
