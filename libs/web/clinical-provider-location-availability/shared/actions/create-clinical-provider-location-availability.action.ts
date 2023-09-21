
import {ClinicalProviderLocationAvailabilityBusinessActionBase} from './clinical-provider-location-availability.business-action-base'
import {ClinicalProviderLocationAvailability,UserCreateClinicalProviderLocationAvailabilityInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClinicalProviderLocationAvailabilityInputIsValidRule} from '../rules/create-clinical-provider-location-availability-input-is-valid.rule'

export class CreateClinicalProviderLocationAvailabilityAction extends ClinicalProviderLocationAvailabilityBusinessActionBase<ClinicalProviderLocationAvailability> {
  constructor(private input: UserCreateClinicalProviderLocationAvailabilityInput) {
    super('CreateClinicalProviderLocationAvailabilityAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClinicalProviderLocationAvailabilityInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderLocationAvailability({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


