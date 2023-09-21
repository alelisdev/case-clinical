
import {InsuranceBusinessActionBase} from './insurance.business-action-base'
import {Insurance,UserCreateInsuranceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateInsuranceInputIsValidRule} from '../rules/create-insurance-input-is-valid.rule'

export class CreateInsuranceAction extends InsuranceBusinessActionBase<Insurance> {
  constructor(private input: UserCreateInsuranceInput) {
    super('CreateInsuranceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateInsuranceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateInsurance({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


