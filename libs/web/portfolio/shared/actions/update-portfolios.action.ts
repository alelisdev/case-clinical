
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PortfolioBusinessActionBase} from './portfolio.business-action-base'
import {PortfolioNameIsValidRule} from '../rules/portfolio-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePortfolioInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePortfoliosAction extends PortfolioBusinessActionBase<UpdateResult> {

    constructor(private portfolios: UserUpdatePortfolioInput[]) {
        super('UpdatePortfoliosAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.portfolios,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePortfolios({ input: { portfolios: this.portfolios} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePortfolioAction extends PortfolioBusinessActionBase<boolean> {

    constructor(private portfolio: UserUpdatePortfolioInput, private portfolioId: string) {
        super('UpdatePortfolioAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.portfolio,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.portfolioId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePortfolio({portfolioId: this.portfolioId, input: this.portfolio }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
