
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseAccount, UserCreateCaseAccountInput, UserUpdateCaseAccountInput } from "@case-clinical/shared/util/sdk";
import { CaseAccountBusinessProviderService } from "./business/case-account.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CaseAccountService extends ServiceBase {
 constructor(
  @Inject(CaseAccountBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseAccountBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseAccountService", loggingService, serviceContext);
 }

    createCaseAccount(input: UserCreateCaseAccountInput): Observable<CaseAccount> {
        return this.businessProvider.createCaseAccount(input);
    }

    updateCaseAccount(input: UserUpdateCaseAccountInput, caseAccountId: string): Observable<CaseAccount> {
        return this.businessProvider.updateCaseAccount(input, caseAccountId);
    }

    importCaseAccounts(caseAccounts: UserUpdateCaseAccountInput[]): Observable<boolean> {
        return this.businessProvider.importCaseAccounts(caseAccounts);
    }
}

