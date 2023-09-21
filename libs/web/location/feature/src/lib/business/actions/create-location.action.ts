
import {LocationBusinessActionBase} from './location.business-action-base'
import {Location,UserCreateLocationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLocationInputIsValidRule} from '../rules/create-location-input-is-valid.rule'

export class CreateLocationAction extends LocationBusinessActionBase<Location> {constructor(private input: UserCreateLocationInput) {
    super('CreateLocationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLocationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLocation({ input: this.input }).pipe
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


