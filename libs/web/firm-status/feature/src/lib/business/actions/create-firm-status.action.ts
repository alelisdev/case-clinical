
import {FirmStatusBusinessActionBase} from './firm-status.business-action-base'
import {FirmStatus,UserCreateFirmStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateFirmStatusInputIsValidRule} from '../rules/create-firm-status-input-is-valid.rule'

export class CreateFirmStatusAction extends FirmStatusBusinessActionBase<FirmStatus> {constructor(private input: UserCreateFirmStatusInput) {
    super('CreateFirmStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateFirmStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateFirmStatus({ input: this.input }).pipe
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


