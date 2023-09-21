
import {PriorAuthorizationImplantBusinessActionBase} from './prior-authorization-implant.business-action-base'
import {PriorAuthorizationImplant,UserCreatePriorAuthorizationImplantInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthorizationImplantInputIsValidRule} from '../rules/create-prior-authorization-implant-input-is-valid.rule'

export class CreatePriorAuthorizationImplantAction extends PriorAuthorizationImplantBusinessActionBase<PriorAuthorizationImplant> {constructor(private input: UserCreatePriorAuthorizationImplantInput) {
    super('CreatePriorAuthorizationImplantAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthorizationImplantInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationImplant({ input: this.input }).pipe
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


