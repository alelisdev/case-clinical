
import {VendorTypeBusinessActionBase} from './vendor-type.business-action-base'
import {VendorType,UserCreateVendorTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateVendorTypeInputIsValidRule} from '../rules/create-vendor-type-input-is-valid.rule'

export class CreateVendorTypeAction extends VendorTypeBusinessActionBase<VendorType> {constructor(private input: UserCreateVendorTypeInput) {
    super('CreateVendorTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateVendorTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateVendorType({ input: this.input }).pipe
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


