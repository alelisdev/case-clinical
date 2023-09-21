
import {CountryBusinessActionBase} from './country.business-action-base'
import {Country,UserCreateCountryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCountryInputIsValidRule} from '../rules/create-country-input-is-valid.rule'

export class CreateCountryAction extends CountryBusinessActionBase<Country> {constructor(private input: UserCreateCountryInput) {
    super('CreateCountryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCountryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCountry({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


