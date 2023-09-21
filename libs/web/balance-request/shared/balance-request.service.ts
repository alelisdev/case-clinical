
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { BalanceRequest, UserCreateBalanceRequestInput, UserUpdateBalanceRequestInput, UpdateResult, Document, LegalCase } from "@case-clinical/shared/util/sdk";
import { BalanceRequestBusinessProviderService } from "./balance-request.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class BalanceRequestService extends ServiceBase {
 constructor(
  @Inject(BalanceRequestBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: BalanceRequestBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("BalanceRequestService", loggingService, serviceContext);
 }

    createBalanceRequest(input: UserCreateBalanceRequestInput): Observable<BalanceRequest> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createBalanceRequest(filteredObj);
    }

    updateBalanceRequest(input: UserUpdateBalanceRequestInput, balanceRequestId: string): Observable<BalanceRequest> {
        return this.businessProvider.updateBalanceRequest(input, balanceRequestId);
    }

    importBalanceRequests(balanceRequests: UserUpdateBalanceRequestInput[]): Observable<UpdateResult> {
        return this.businessProvider.importBalanceRequests(balanceRequests);
    }

    validateBalanceRequestExcelData(excelData: any[], statements: Document[], legalCases: LegalCase[]) {
      return this.businessProvider.validateBalanceRequestExcelData(excelData, statements, legalCases);
    }
}

