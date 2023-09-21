
import {TreatmentBusinessActionBase} from './treatment.business-action-base'
import {Treatment,UserCreateTreatmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTreatmentInputIsValidRule} from '../rules/create-treatment-input-is-valid.rule'

export class CreateTreatmentAction extends TreatmentBusinessActionBase<Treatment> {
  constructor(private input: UserCreateTreatmentInput) {
    super('CreateTreatmentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTreatmentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTreatment({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


