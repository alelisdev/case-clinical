
import {ProcedureVendorBusinessActionBase} from './procedure-vendor.business-action-base'
import {ProcedureVendor,UserCreateProcedureVendorInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureVendorInputIsValidRule} from '../rules/create-procedure-vendor-input-is-valid.rule'

export class CreateProcedureVendorAction extends ProcedureVendorBusinessActionBase<ProcedureVendor> {
  constructor(private input: UserCreateProcedureVendorInput) {
    super('CreateProcedureVendorAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureVendorInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureVendor({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


