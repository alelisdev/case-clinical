
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AccountStatus, UserCreateAccountStatusInput, UserUpdateAccountStatusInput } from "@case-clinical/shared/util/sdk";
import { AccountStatusBusinessProviderService } from "./business/account-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AccountStatusService extends ServiceBase {
 constructor(
  @Inject(AccountStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AccountStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AccountStatusService", loggingService, serviceContext);
 }

    createAccountStatus(input: UserCreateAccountStatusInput): Observable<AccountStatus> {
        return this.businessProvider.createAccountStatus(input);
    }

    updateAccountStatus(input: UserUpdateAccountStatusInput, accountStatusId: string): Observable<AccountStatus> {
        return this.businessProvider.updateAccountStatus(input, accountStatusId);
    }

    importAccountStatuses(accountStatuses: UserUpdateAccountStatusInput[]): Observable<boolean> {
        return this.businessProvider.importAccountStatuses(accountStatuses);
    }
}

