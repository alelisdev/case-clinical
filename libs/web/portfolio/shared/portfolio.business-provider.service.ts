
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Portfolio, UserCreatePortfolioInput, UserUpdatePortfolioInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidatePortfolioExcelDataAction } from './actions/validate-portfolio-excel-data.action'
import { CreatePortfolioAction } from './actions/create-portfolio.action'
import { UpdatePortfoliosAction, UpdatePortfolioAction } from './actions/update-portfolios.action'


@Injectable({providedIn: 'root'})
export class PortfolioBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importPortfolios(portfolios: UserUpdatePortfolioInput[]): Observable<UpdateResult> {
    const updatePortfoliosAction = new UpdatePortfoliosAction(portfolios);
    updatePortfoliosAction.Do(this)
    return updatePortfoliosAction.response;
  }

  validatePortfolioExcelData(excelData: any[] ) {
    const validatePortfolioExcelDataAction = new ValidatePortfolioExcelDataAction(excelData );
    validatePortfolioExcelDataAction.Do(this)
    return validatePortfolioExcelDataAction.response;
  }
}

