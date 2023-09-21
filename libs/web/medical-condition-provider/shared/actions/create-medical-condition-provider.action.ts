
import {MedicalConditionProviderBusinessActionBase} from './medical-condition-provider.business-action-base'
import {MedicalConditionProvider,UserCreateMedicalConditionProviderInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateMedicalConditionProviderInputIsValidRule} from '../rules/create-medical-condition-provider-input-is-valid.rule'

export class CreateMedicalConditionProviderAction extends MedicalConditionProviderBusinessActionBase<MedicalConditionProvider> {
  constructor(private input: UserCreateMedicalConditionProviderInput) {
    super('CreateMedicalConditionProviderAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateMedicalConditionProviderInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateMedicalConditionProvider({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


