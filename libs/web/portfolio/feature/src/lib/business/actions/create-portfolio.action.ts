
import {PortfolioBusinessActionBase} from './portfolio.business-action-base'
import {Portfolio,UserCreatePortfolioInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreatePortfolioInputIsValidRule} from '../rules/create-portfolio-input-is-valid.rule'

export class CreatePortfolioAction extends PortfolioBusinessActionBase<Portfolio> {constructor(private input: UserCreatePortfolioInput) {
    super('CreatePortfolioAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreatePortfolioInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreatePortfolio({ input: this.input }).pipe
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


