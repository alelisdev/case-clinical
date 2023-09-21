
import {SurgicalPositionBusinessActionBase} from './surgical-position.business-action-base'
import {SurgicalPosition,UserCreateSurgicalPositionInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateSurgicalPositionInputIsValidRule} from '../rules/create-surgical-position-input-is-valid.rule'

export class CreateSurgicalPositionAction extends SurgicalPositionBusinessActionBase<SurgicalPosition> {constructor(private input: UserCreateSurgicalPositionInput) {
    super('CreateSurgicalPositionAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateSurgicalPositionInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateSurgicalPosition({ input: this.input }).pipe
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


