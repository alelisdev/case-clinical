
import {ReconciliationPeriodTypeBusinessActionBase} from './reconciliation-period-type.business-action-base'
import {ReconciliationPeriodType,UserCreateReconciliationPeriodTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateReconciliationPeriodTypeInputIsValidRule} from '../rules/create-reconciliation-period-type-input-is-valid.rule'

export class CreateReconciliationPeriodTypeAction extends ReconciliationPeriodTypeBusinessActionBase<ReconciliationPeriodType> {
  constructor(private input: UserCreateReconciliationPeriodTypeInput) {
    super('CreateReconciliationPeriodTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateReconciliationPeriodTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateReconciliationPeriodType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


