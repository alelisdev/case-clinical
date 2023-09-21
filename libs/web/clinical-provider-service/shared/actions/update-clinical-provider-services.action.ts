
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClinicalProviderServiceBusinessActionBase} from './clinical-provider-service.business-action-base'
import {ClinicalProviderServiceNameIsValidRule} from '../rules/clinical-provider-service-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClinicalProviderServiceInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClinicalProviderServicesAction extends ClinicalProviderServiceBusinessActionBase<UpdateResult> {

    constructor(private clinicalProviderServices: UserUpdateClinicalProviderServiceInput[]) {
        super('UpdateClinicalProviderServicesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderServices,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderServices({ input: { clinicalProviderServices: this.clinicalProviderServices} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClinicalProviderServiceAction extends ClinicalProviderServiceBusinessActionBase<boolean> {

    constructor(private clinicalProviderService: UserUpdateClinicalProviderServiceInput, private clinicalProviderServiceId: string) {
        super('UpdateClinicalProviderServiceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderService,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.clinicalProviderServiceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderService({clinicalProviderServiceId: this.clinicalProviderServiceId, input: this.clinicalProviderService }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
