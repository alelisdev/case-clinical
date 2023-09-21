
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CountryBusinessActionBase} from './country.business-action-base'
import {CountryNameIsValidRule} from '../rules/country-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCountryInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateCountriesAction extends CountryBusinessActionBase<UpdateResult> {

    constructor(private countries: UserUpdateCountryInput[]) {
        super('UpdateCountriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.countries,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCountries({ input: { countries: this.countries} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateCountryAction extends CountryBusinessActionBase<boolean> {

    constructor(private country: UserUpdateCountryInput, private countryId: string) {
        super('UpdateCountryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.country,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.countryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCountry({countryId: this.countryId, input: this.country }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
