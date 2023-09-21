
import {ProcedureVendorStatusBusinessActionBase} from './procedure-vendor-status.business-action-base'
import {ProcedureVendorStatus,UserCreateProcedureVendorStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateProcedureVendorStatusInputIsValidRule} from '../rules/create-procedure-vendor-status-input-is-valid.rule'

export class CreateProcedureVendorStatusAction extends ProcedureVendorStatusBusinessActionBase<ProcedureVendorStatus> {
  constructor(private input: UserCreateProcedureVendorStatusInput) {
    super('CreateProcedureVendorStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateProcedureVendorStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateProcedureVendorStatus({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


