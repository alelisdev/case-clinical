
import {FirmBusinessActionBase} from './firm.business-action-base'
import {Firm,UserCreateFirmInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateFirmInputIsValidRule} from '../rules/create-firm-input-is-valid.rule'

export class CreateFirmAction extends FirmBusinessActionBase<Firm> {
  constructor(private input: UserCreateFirmInput) {
    super('CreateFirmAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateFirmInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateFirm({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


