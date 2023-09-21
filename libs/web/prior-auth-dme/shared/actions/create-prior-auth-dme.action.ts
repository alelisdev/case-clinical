
import {PriorAuthDmeBusinessActionBase} from './prior-auth-dme.business-action-base'
import {PriorAuthDme,UserCreatePriorAuthDmeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthDmeInputIsValidRule} from '../rules/create-prior-auth-dme-input-is-valid.rule'

export class CreatePriorAuthDmeAction extends PriorAuthDmeBusinessActionBase<PriorAuthDme> {
  constructor(private input: UserCreatePriorAuthDmeInput) {
    super('CreatePriorAuthDmeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthDmeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthDme({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


