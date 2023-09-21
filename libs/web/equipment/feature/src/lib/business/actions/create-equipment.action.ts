
import {EquipmentBusinessActionBase} from './equipment.business-action-base'
import {Equipment,UserCreateEquipmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateEquipmentInputIsValidRule} from '../rules/create-equipment-input-is-valid.rule'

export class CreateEquipmentAction extends EquipmentBusinessActionBase<Equipment> {constructor(private input: UserCreateEquipmentInput) {
    super('CreateEquipmentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateEquipmentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateEquipment({ input: this.input }).pipe
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


