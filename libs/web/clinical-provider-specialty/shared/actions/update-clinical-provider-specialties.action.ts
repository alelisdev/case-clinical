
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClinicalProviderSpecialtyBusinessActionBase} from './clinical-provider-specialty.business-action-base'
import {ClinicalProviderSpecialtyNameIsValidRule} from '../rules/clinical-provider-specialty-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClinicalProviderSpecialtyInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClinicalProviderSpecialtiesAction extends ClinicalProviderSpecialtyBusinessActionBase<UpdateResult> {

    constructor(private clinicalProviderSpecialties: UserUpdateClinicalProviderSpecialtyInput[]) {
        super('UpdateClinicalProviderSpecialtiesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderSpecialties,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderSpecialties({ input: { clinicalProviderSpecialties: this.clinicalProviderSpecialties} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClinicalProviderSpecialtyAction extends ClinicalProviderSpecialtyBusinessActionBase<boolean> {

    constructor(private clinicalProviderSpecialty: UserUpdateClinicalProviderSpecialtyInput, private clinicalProviderSpecialtyId: string) {
        super('UpdateClinicalProviderSpecialtyAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderSpecialty,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.clinicalProviderSpecialtyId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderSpecialty({clinicalProviderSpecialtyId: this.clinicalProviderSpecialtyId, input: this.clinicalProviderSpecialty }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
