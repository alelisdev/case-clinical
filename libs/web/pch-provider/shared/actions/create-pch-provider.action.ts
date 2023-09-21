
import {PchProviderBusinessActionBase} from './pch-provider.business-action-base'
import {PchProvider,UserCreatePchProviderInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePchProviderInputIsValidRule} from '../rules/create-pch-provider-input-is-valid.rule'

export class CreatePchProviderAction extends PchProviderBusinessActionBase<PchProvider> {
  constructor(private input: UserCreatePchProviderInput) {
    super('CreatePchProviderAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePchProviderInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePchProvider({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


