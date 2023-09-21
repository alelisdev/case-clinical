
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {MedicalConditionProviderBusinessActionBase} from './medical-condition-provider.business-action-base'
import {MedicalConditionProviderNameIsValidRule} from '../rules/medical-condition-provider-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateMedicalConditionProviderInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateMedicalConditionProvidersAction extends MedicalConditionProviderBusinessActionBase<UpdateResult> {

    constructor(private medicalConditionProviders: UserUpdateMedicalConditionProviderInput[]) {
        super('UpdateMedicalConditionProvidersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalConditionProviders,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalConditionProviders({ input: { medicalConditionProviders: this.medicalConditionProviders} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateMedicalConditionProviderAction extends MedicalConditionProviderBusinessActionBase<boolean> {

    constructor(private medicalConditionProvider: UserUpdateMedicalConditionProviderInput, private medicalConditionProviderId: string) {
        super('UpdateMedicalConditionProviderAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.medicalConditionProvider,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.medicalConditionProviderId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateMedicalConditionProvider({medicalConditionProviderId: this.medicalConditionProviderId, input: this.medicalConditionProvider }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
