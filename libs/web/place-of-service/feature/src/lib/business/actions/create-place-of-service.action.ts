
import {PlaceOfServiceBusinessActionBase} from './place-of-service.business-action-base'
import {PlaceOfService,UserCreatePlaceOfServiceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePlaceOfServiceInputIsValidRule} from '../rules/create-place-of-service-input-is-valid.rule'

export class CreatePlaceOfServiceAction extends PlaceOfServiceBusinessActionBase<PlaceOfService> {constructor(private input: UserCreatePlaceOfServiceInput) {
    super('CreatePlaceOfServiceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePlaceOfServiceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePlaceOfService({ input: this.input }).pipe
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


