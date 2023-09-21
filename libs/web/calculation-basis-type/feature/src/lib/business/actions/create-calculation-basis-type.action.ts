
import {CalculationBasisTypeBusinessActionBase} from './calculation-basis-type.business-action-base'
import {CalculationBasisType,UserCreateCalculationBasisTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateCalculationBasisTypeInputIsValidRule} from '../rules/create-calculation-basis-type-input-is-valid.rule'

export class CreateCalculationBasisTypeAction extends CalculationBasisTypeBusinessActionBase<CalculationBasisType> {constructor(private input: UserCreateCalculationBasisTypeInput) {
    super('CreateCalculationBasisTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateCalculationBasisTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateCalculationBasisType({ input: this.input }).pipe
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


