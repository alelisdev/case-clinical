
import {ClinicalProviderBusinessActionBase} from './clinical-provider.business-action-base'
import {ClinicalProvider,UserCreateClinicalProviderInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClinicalProviderInputIsValidRule} from '../rules/create-clinical-provider-input-is-valid.rule'

export class CreateClinicalProviderAction extends ClinicalProviderBusinessActionBase<ClinicalProvider> {
  constructor(private input: UserCreateClinicalProviderInput) {
    super('CreateClinicalProviderAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClinicalProviderInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProvider({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


