
import {VendorBusinessActionBase} from './vendor.business-action-base'
import {Vendor,UserCreateVendorInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateVendorInputIsValidRule} from '../rules/create-vendor-input-is-valid.rule'

export class CreateVendorAction extends VendorBusinessActionBase<Vendor> {
  constructor(private input: UserCreateVendorInput) {
    super('CreateVendorAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateVendorInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    console.log('performAction')
    this.response = this.businessProvider.data.userCreateVendor({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


