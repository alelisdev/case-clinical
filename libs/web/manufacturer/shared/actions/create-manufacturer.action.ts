
import {ManufacturerBusinessActionBase} from './manufacturer.business-action-base'
import {Manufacturer,UserCreateManufacturerInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateManufacturerInputIsValidRule} from '../rules/create-manufacturer-input-is-valid.rule'

export class CreateManufacturerAction extends ManufacturerBusinessActionBase<Manufacturer> {
  constructor(private input: UserCreateManufacturerInput) {
    super('CreateManufacturerAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateManufacturerInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateManufacturer({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


