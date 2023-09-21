
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ClinicalProviderTagBusinessActionBase} from './clinical-provider-tag.business-action-base'
import {ClinicalProviderTagNameIsValidRule} from '../rules/clinical-provider-tag-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateClinicalProviderTagInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateClinicalProviderTagsAction extends ClinicalProviderTagBusinessActionBase<UpdateResult> {

    constructor(private clinicalProviderTags: UserUpdateClinicalProviderTagInput[]) {
        super('UpdateClinicalProviderTagsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderTags,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderTags({ input: { clinicalProviderTags: this.clinicalProviderTags} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateClinicalProviderTagAction extends ClinicalProviderTagBusinessActionBase<boolean> {

    constructor(private clinicalProviderTag: UserUpdateClinicalProviderTagInput, private clinicalProviderTagId: string) {
        super('UpdateClinicalProviderTagAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.clinicalProviderTag,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.clinicalProviderTagId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateClinicalProviderTag({clinicalProviderTagId: this.clinicalProviderTagId, input: this.clinicalProviderTag }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
