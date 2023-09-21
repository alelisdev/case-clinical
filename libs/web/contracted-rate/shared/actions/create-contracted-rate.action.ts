
import {ContractedRateBusinessActionBase} from './contracted-rate.business-action-base'
import {ContractedRate,UserCreateContractedRateInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContractedRateInputIsValidRule} from '../rules/create-contracted-rate-input-is-valid.rule'

export class CreateContractedRateAction extends ContractedRateBusinessActionBase<ContractedRate> {
  constructor(private input: UserCreateContractedRateInput) {
    super('CreateContractedRateAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContractedRateInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContractedRate({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


