
import {HealthInsuranceBusinessActionBase} from './health-insurance.business-action-base'
import {HealthInsurance,UserCreateHealthInsuranceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateHealthInsuranceInputIsValidRule} from '../rules/create-health-insurance-input-is-valid.rule'

export class CreateHealthInsuranceAction extends HealthInsuranceBusinessActionBase<HealthInsurance> {
  constructor(private input: UserCreateHealthInsuranceInput) {
    super('CreateHealthInsuranceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateHealthInsuranceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateHealthInsurance({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


