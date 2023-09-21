
import {VendorLocationBusinessActionBase} from './vendor-location.business-action-base'
import {VendorLocation,UserCreateVendorLocationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateVendorLocationInputIsValidRule} from '../rules/create-vendor-location-input-is-valid.rule'

export class CreateVendorLocationAction extends VendorLocationBusinessActionBase<VendorLocation> {
  constructor(private input: UserCreateVendorLocationInput) {
    super('CreateVendorLocationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateVendorLocationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateVendorLocation({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


