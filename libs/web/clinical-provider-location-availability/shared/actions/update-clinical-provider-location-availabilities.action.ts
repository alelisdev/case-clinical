
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClinicalProviderLocationAvailabilityBusinessActionBase} from './clinical-provider-location-availability.business-action-base'
import {ClinicalProviderLocationAvailabilityNameIsValidRule} from '../rules/clinical-provider-location-availability-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClinicalProviderLocationAvailabilityInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClinicalProviderLocationAvailabilitiesAction extends ClinicalProviderLocationAvailabilityBusinessActionBase<UpdateResult> {

    constructor(private clinicalProviderLocationAvailabilities: UserUpdateClinicalProviderLocationAvailabilityInput[]) {
        super('UpdateClinicalProviderLocationAvailabilitiesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderLocationAvailabilities,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderLocationAvailabilities({ input: { clinicalProviderLocationAvailabilities: this.clinicalProviderLocationAvailabilities} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClinicalProviderLocationAvailabilityAction extends ClinicalProviderLocationAvailabilityBusinessActionBase<boolean> {

    constructor(private clinicalProviderLocationAvailability: UserUpdateClinicalProviderLocationAvailabilityInput, private clinicalProviderLocationAvailabilityId: string) {
        super('UpdateClinicalProviderLocationAvailabilityAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderLocationAvailability,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.clinicalProviderLocationAvailabilityId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderLocationAvailability({clinicalProviderLocationAvailabilityId: this.clinicalProviderLocationAvailabilityId, input: this.clinicalProviderLocationAvailability }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
