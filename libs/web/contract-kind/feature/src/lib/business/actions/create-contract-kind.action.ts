
import {ContractKindBusinessActionBase} from './contract-kind.business-action-base'
import {ContractKind,UserCreateContractKindInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContractKindInputIsValidRule} from '../rules/create-contract-kind-input-is-valid.rule'

export class CreateContractKindAction extends ContractKindBusinessActionBase<ContractKind> {constructor(private input: UserCreateContractKindInput) {
    super('CreateContractKindAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContractKindInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContractKind({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


