
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Portfolio, UserCreatePortfolioInput, UserUpdatePortfolioInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PortfolioBusinessProviderService } from "./portfolio.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PortfolioService extends ServiceBase {
 constructor(
  @Inject(PortfolioBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PortfolioBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PortfolioService", loggingService, serviceContext);
 }

    createPortfolio(input: UserCreatePortfolioInput): Observable<Portfolio> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPortfolio(filteredObj);
    }

    updatePortfolio(input: UserUpdatePortfolioInput, portfolioId: string): Observable<Portfolio> {
        return this.businessProvider.updatePortfolio(input, portfolioId);
    }

    importPortfolios(portfolios: UserUpdatePortfolioInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPortfolios(portfolios);
    }

    validatePortfolioExcelData(excelData: any[] ) {
      return this.businessProvider.validatePortfolioExcelData(excelData );
    }
}

