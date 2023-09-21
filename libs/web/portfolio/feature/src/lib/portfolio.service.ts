
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Portfolio, UserCreatePortfolioInput, UserUpdatePortfolioInput } from "@case-clinical/shared/util/sdk";
import { PortfolioBusinessProviderService } from "./business/portfolio.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPortfolio(input);
    }

    updatePortfolio(input: UserUpdatePortfolioInput, portfolioId: string): Observable<Portfolio> {
        return this.businessProvider.updatePortfolio(input, portfolioId);
    }

    importPortfolios(portfolios: UserUpdatePortfolioInput[]): Observable<boolean> {
        return this.businessProvider.importPortfolios(portfolios);
    }
}

