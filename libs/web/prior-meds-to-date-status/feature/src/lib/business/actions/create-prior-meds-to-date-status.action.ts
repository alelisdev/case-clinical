
import {PriorMedsToDateStatusBusinessActionBase} from './prior-meds-to-date-status.business-action-base'
import {PriorMedsToDateStatus,UserCreatePriorMedsToDateStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePriorMedsToDateStatusInputIsValidRule} from '../rules/create-prior-meds-to-date-status-input-is-valid.rule'

export class CreatePriorMedsToDateStatusAction extends PriorMedsToDateStatusBusinessActionBase<PriorMedsToDateStatus> {constructor(private input: UserCreatePriorMedsToDateStatusInput) {
    super('CreatePriorMedsToDateStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePriorMedsToDateStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePriorMedsToDateStatus({ input: this.input }).pipe
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


