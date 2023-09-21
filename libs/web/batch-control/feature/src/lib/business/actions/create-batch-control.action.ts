
import {BatchControlBusinessActionBase} from './batch-control.business-action-base'
import {BatchControl,UserCreateBatchControlInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateBatchControlInputIsValidRule} from '../rules/create-batch-control-input-is-valid.rule'

export class CreateBatchControlAction extends BatchControlBusinessActionBase<BatchControl> {constructor(private input: UserCreateBatchControlInput) {
    super('CreateBatchControlAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateBatchControlInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateBatchControl({ input: this.input }).pipe
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


