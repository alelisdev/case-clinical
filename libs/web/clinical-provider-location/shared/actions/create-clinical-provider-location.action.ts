
import {ClinicalProviderLocationBusinessActionBase} from './clinical-provider-location.business-action-base'
import {ClinicalProviderLocation,UserCreateClinicalProviderLocationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClinicalProviderLocationInputIsValidRule} from '../rules/create-clinical-provider-location-input-is-valid.rule'

export class CreateClinicalProviderLocationAction extends ClinicalProviderLocationBusinessActionBase<ClinicalProviderLocation> {
  constructor(private input: UserCreateClinicalProviderLocationInput) {
    super('CreateClinicalProviderLocationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClinicalProviderLocationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderLocation({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


