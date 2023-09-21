
import {BalanceRequestBusinessActionBase} from './balance-request.business-action-base'
import {BalanceRequest,UserCreateBalanceRequestInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateBalanceRequestInputIsValidRule} from '../rules/create-balance-request-input-is-valid.rule'

export class CreateBalanceRequestAction extends BalanceRequestBusinessActionBase<BalanceRequest> {
  constructor(private input: UserCreateBalanceRequestInput) {
    super('CreateBalanceRequestAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateBalanceRequestInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateBalanceRequest({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


