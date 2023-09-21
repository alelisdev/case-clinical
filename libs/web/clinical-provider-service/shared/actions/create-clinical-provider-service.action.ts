
import {ClinicalProviderServiceBusinessActionBase} from './clinical-provider-service.business-action-base'
import {ClinicalProviderService,UserCreateClinicalProviderServiceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClinicalProviderServiceInputIsValidRule} from '../rules/create-clinical-provider-service-input-is-valid.rule'

export class CreateClinicalProviderServiceAction extends ClinicalProviderServiceBusinessActionBase<ClinicalProviderService> {
  constructor(private input: UserCreateClinicalProviderServiceInput) {
    super('CreateClinicalProviderServiceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClinicalProviderServiceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderService({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


