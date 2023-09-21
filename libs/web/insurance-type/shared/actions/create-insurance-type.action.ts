
import {InsuranceTypeBusinessActionBase} from './insurance-type.business-action-base'
import {InsuranceType,UserCreateInsuranceTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateInsuranceTypeInputIsValidRule} from '../rules/create-insurance-type-input-is-valid.rule'

export class CreateInsuranceTypeAction extends InsuranceTypeBusinessActionBase<InsuranceType> {
  constructor(private input: UserCreateInsuranceTypeInput) {
    super('CreateInsuranceTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateInsuranceTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateInsuranceType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


