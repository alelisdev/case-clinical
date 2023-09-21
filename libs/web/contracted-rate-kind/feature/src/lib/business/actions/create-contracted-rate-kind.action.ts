
import {ContractedRateKindBusinessActionBase} from './contracted-rate-kind.business-action-base'
import {ContractedRateKind,UserCreateContractedRateKindInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContractedRateKindInputIsValidRule} from '../rules/create-contracted-rate-kind-input-is-valid.rule'

export class CreateContractedRateKindAction extends ContractedRateKindBusinessActionBase<ContractedRateKind> {constructor(private input: UserCreateContractedRateKindInput) {
    super('CreateContractedRateKindAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContractedRateKindInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContractedRateKind({ input: this.input }).pipe
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


