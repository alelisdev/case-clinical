
import {PayorTypeBusinessActionBase} from './payor-type.business-action-base'
import {PayorType,UserCreatePayorTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePayorTypeInputIsValidRule} from '../rules/create-payor-type-input-is-valid.rule'

export class CreatePayorTypeAction extends PayorTypeBusinessActionBase<PayorType> {
  constructor(private input: UserCreatePayorTypeInput) {
    super('CreatePayorTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePayorTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePayorType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


