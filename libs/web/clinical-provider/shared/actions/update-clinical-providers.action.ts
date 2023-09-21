
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClinicalProviderBusinessActionBase} from './clinical-provider.business-action-base'
import {ClinicalProviderNameIsValidRule} from '../rules/clinical-provider-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClinicalProviderInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClinicalProvidersAction extends ClinicalProviderBusinessActionBase<UpdateResult> {

    constructor(private clinicalProviders: UserUpdateClinicalProviderInput[]) {
        super('UpdateClinicalProvidersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviders,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviders({ input: { clinicalProviders: this.clinicalProviders} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClinicalProviderAction extends ClinicalProviderBusinessActionBase<boolean> {

    constructor(private clinicalProvider: UserUpdateClinicalProviderInput, private clinicalProviderId: string) {
        super('UpdateClinicalProviderAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProvider,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.clinicalProviderId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProvider({clinicalProviderId: this.clinicalProviderId, input: this.clinicalProvider }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
