
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreatePortfolioAction} from './actions/create-portfolio.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Portfolio, UserCreatePortfolioInput, UserUpdatePortfolioInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdatePortfoliosAction, UpdatePortfolioAction } from './actions/update-portfolios.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class PortfolioBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.PortfolioBusinessProviderService', logger, serviceContext)
  }

  createPortfolio(input: UserCreatePortfolioInput): Observable<Portfolio> {
    const action = new CreatePortfolioAction(input); 
    action.Do(this);
    return action.response;   
  }

  updatePortfolio(input: UserUpdatePortfolioInput, portfolioId: string): Observable<Portfolio> {
    const action = new UpdatePortfolioAction(input, portfolioId); 
    action.Do(this);
    return action.response;   
  }
  
  importPortfolios(portfolios: UserUpdatePortfolioInput[]): Observable<boolean> {
    const updatePortfoliosAction = new UpdatePortfoliosAction(portfolios);
    updatePortfoliosAction.Do(this)
    return updatePortfoliosAction.response;
  }
}

