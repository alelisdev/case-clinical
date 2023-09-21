
import {DurableMedicalEquipmentBusinessActionBase} from './durable-medical-equipment.business-action-base'
import {DurableMedicalEquipment,UserCreateDurableMedicalEquipmentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateDurableMedicalEquipmentInputIsValidRule} from '../rules/create-durable-medical-equipment-input-is-valid.rule'

export class CreateDurableMedicalEquipmentAction extends DurableMedicalEquipmentBusinessActionBase<DurableMedicalEquipment> {
  constructor(private input: UserCreateDurableMedicalEquipmentInput) {
    super('CreateDurableMedicalEquipmentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateDurableMedicalEquipmentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateDurableMedicalEquipment({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


