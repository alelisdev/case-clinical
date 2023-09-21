
import {ClinicalProviderTagBusinessActionBase} from './clinical-provider-tag.business-action-base'
import {ClinicalProviderTag,UserCreateClinicalProviderTagInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateClinicalProviderTagInputIsValidRule} from '../rules/create-clinical-provider-tag-input-is-valid.rule'

export class CreateClinicalProviderTagAction extends ClinicalProviderTagBusinessActionBase<ClinicalProviderTag> {
  constructor(private input: UserCreateClinicalProviderTagInput) {
    super('CreateClinicalProviderTagAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateClinicalProviderTagInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateClinicalProviderTag({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


