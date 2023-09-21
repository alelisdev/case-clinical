
import {ClinicalProviderSpecialtyBusinessActionBase} from './clinical-provider-specialty.business-action-base'
import {ClinicalProviderSpecialty,UserCreateClinicalProviderSpecialtyInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClinicalProviderSpecialtyInputIsValidRule} from '../rules/create-clinical-provider-specialty-input-is-valid.rule'

export class CreateClinicalProviderSpecialtyAction extends ClinicalProviderSpecialtyBusinessActionBase<ClinicalProviderSpecialty> {
  constructor(private input: UserCreateClinicalProviderSpecialtyInput) {
    super('CreateClinicalProviderSpecialtyAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClinicalProviderSpecialtyInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderSpecialty({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


