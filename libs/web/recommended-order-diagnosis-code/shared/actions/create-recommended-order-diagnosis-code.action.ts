
import {RecommendedOrderDiagnosisCodeBusinessActionBase} from './recommended-order-diagnosis-code.business-action-base'
import {RecommendedOrderDiagnosisCode,UserCreateRecommendedOrderDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRecommendedOrderDiagnosisCodeInputIsValidRule} from '../rules/create-recommended-order-diagnosis-code-input-is-valid.rule'

export class CreateRecommendedOrderDiagnosisCodeAction extends RecommendedOrderDiagnosisCodeBusinessActionBase<RecommendedOrderDiagnosisCode> {
  constructor(private input: UserCreateRecommendedOrderDiagnosisCodeInput) {
    super('CreateRecommendedOrderDiagnosisCodeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRecommendedOrderDiagnosisCodeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRecommendedOrderDiagnosisCode({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


