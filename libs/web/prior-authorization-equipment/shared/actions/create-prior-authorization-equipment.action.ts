
import {PriorAuthorizationEquipmentBusinessActionBase} from './prior-authorization-equipment.business-action-base'
import {PriorAuthorizationEquipment,UserCreatePriorAuthorizationEquipmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorAuthorizationEquipmentInputIsValidRule} from '../rules/create-prior-authorization-equipment-input-is-valid.rule'

export class CreatePriorAuthorizationEquipmentAction extends PriorAuthorizationEquipmentBusinessActionBase<PriorAuthorizationEquipment> {
  constructor(private input: UserCreatePriorAuthorizationEquipmentInput) {
    super('CreatePriorAuthorizationEquipmentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorAuthorizationEquipmentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorAuthorizationEquipment({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


