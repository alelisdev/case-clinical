
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClinicalProviderLocationBusinessActionBase} from './clinical-provider-location.business-action-base'
import {ClinicalProviderLocationNameIsValidRule} from '../rules/clinical-provider-location-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClinicalProviderLocationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClinicalProviderLocationsAction extends ClinicalProviderLocationBusinessActionBase<UpdateResult> {

    constructor(private clinicalProviderLocations: UserUpdateClinicalProviderLocationInput[]) {
        super('UpdateClinicalProviderLocationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderLocations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderLocations({ input: { clinicalProviderLocations: this.clinicalProviderLocations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClinicalProviderLocationAction extends ClinicalProviderLocationBusinessActionBase<boolean> {

    constructor(private clinicalProviderLocation: UserUpdateClinicalProviderLocationInput, private clinicalProviderLocationId: string) {
        super('UpdateClinicalProviderLocationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderLocation,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.clinicalProviderLocationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderLocation({clinicalProviderLocationId: this.clinicalProviderLocationId, input: this.clinicalProviderLocation }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
