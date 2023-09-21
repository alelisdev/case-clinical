
import {AdverseInsuranceStatusBusinessActionBase} from './adverse-insurance-status.business-action-base'
import {AdverseInsuranceStatus,UserCreateAdverseInsuranceStatusInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAdverseInsuranceStatusInputIsValidRule} from '../rules/create-adverse-insurance-status-input-is-valid.rule'

export class CreateAdverseInsuranceStatusAction extends AdverseInsuranceStatusBusinessActionBase<AdverseInsuranceStatus> {constructor(private input: UserCreateAdverseInsuranceStatusInput) {
    super('CreateAdverseInsuranceStatusAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAdverseInsuranceStatusInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAdverseInsuranceStatus({ input: this.input }).pipe
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


