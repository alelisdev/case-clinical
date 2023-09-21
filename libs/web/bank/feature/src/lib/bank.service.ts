
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Bank, UserCreateBankInput, UserUpdateBankInput } from "@case-clinical/shared/util/sdk";
import { BankBusinessProviderService } from "./business/bank.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class BankService extends ServiceBase {
 constructor(
  @Inject(BankBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: BankBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("BankService", loggingService, serviceContext);
 }

    createBank(input: UserCreateBankInput): Observable<Bank> {
        return this.businessProvider.createBank(input);
    }

    updateBank(input: UserUpdateBankInput, bankId: string): Observable<Bank> {
        return this.businessProvider.updateBank(input, bankId);
    }

    importBanks(banks: UserUpdateBankInput[]): Observable<boolean> {
        return this.businessProvider.importBanks(banks);
    }
}

