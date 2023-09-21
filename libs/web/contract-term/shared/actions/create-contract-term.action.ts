
import {ContractTermBusinessActionBase} from './contract-term.business-action-base'
import {ContractTerm,UserCreateContractTermInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContractTermInputIsValidRule} from '../rules/create-contract-term-input-is-valid.rule'

export class CreateContractTermAction extends ContractTermBusinessActionBase<ContractTerm> {
  constructor(private input: UserCreateContractTermInput) {
    super('CreateContractTermAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContractTermInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContractTerm({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


