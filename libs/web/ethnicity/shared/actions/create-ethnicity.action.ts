
import {EthnicityBusinessActionBase} from './ethnicity.business-action-base'
import {Ethnicity,UserCreateEthnicityInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateEthnicityInputIsValidRule} from '../rules/create-ethnicity-input-is-valid.rule'

export class CreateEthnicityAction extends EthnicityBusinessActionBase<Ethnicity> {
  constructor(private input: UserCreateEthnicityInput) {
    super('CreateEthnicityAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateEthnicityInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateEthnicity({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


