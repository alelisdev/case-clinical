
import {ImplantBusinessActionBase} from './implant.business-action-base'
import {Implant,UserCreateImplantInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateImplantInputIsValidRule} from '../rules/create-implant-input-is-valid.rule'

export class CreateImplantAction extends ImplantBusinessActionBase<Implant> {
  constructor(private input: UserCreateImplantInput) {
    super('CreateImplantAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateImplantInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateImplant({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


