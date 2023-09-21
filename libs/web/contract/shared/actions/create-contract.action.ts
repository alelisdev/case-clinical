
import {ContractBusinessActionBase} from './contract.business-action-base'
import {Contract,UserCreateContractInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContractInputIsValidRule} from '../rules/create-contract-input-is-valid.rule'

export class CreateContractAction extends ContractBusinessActionBase<Contract> {
  constructor(private input: UserCreateContractInput) {
    super('CreateContractAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContractInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContract({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


