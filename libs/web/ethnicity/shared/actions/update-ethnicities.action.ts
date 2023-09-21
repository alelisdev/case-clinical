
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {EthnicityBusinessActionBase} from './ethnicity.business-action-base'
import {EthnicityNameIsValidRule} from '../rules/ethnicity-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateEthnicityInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateEthnicitiesAction extends EthnicityBusinessActionBase<UpdateResult> {

    constructor(private ethnicities: UserUpdateEthnicityInput[]) {
        super('UpdateEthnicitiesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.ethnicities,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEthnicities({ input: { ethnicities: this.ethnicities} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateEthnicityAction extends EthnicityBusinessActionBase<boolean> {

    constructor(private ethnicity: UserUpdateEthnicityInput, private ethnicityId: string) {
        super('UpdateEthnicityAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.ethnicity,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.ethnicityId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEthnicity({ethnicityId: this.ethnicityId, input: this.ethnicity }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
