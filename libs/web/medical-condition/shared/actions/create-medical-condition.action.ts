
import {MedicalConditionBusinessActionBase} from './medical-condition.business-action-base'
import {MedicalCondition,UserCreateMedicalConditionInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateMedicalConditionInputIsValidRule} from '../rules/create-medical-condition-input-is-valid.rule'

export class CreateMedicalConditionAction extends MedicalConditionBusinessActionBase<MedicalCondition> {
  constructor(private input: UserCreateMedicalConditionInput) {
    super('CreateMedicalConditionAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateMedicalConditionInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateMedicalCondition({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


