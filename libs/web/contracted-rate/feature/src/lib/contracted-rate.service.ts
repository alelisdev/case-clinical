
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContractedRate, UserCreateContractedRateInput, UserUpdateContractedRateInput } from "@case-clinical/shared/util/sdk";
import { ContractedRateBusinessProviderService } from "./business/contracted-rate.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContractedRateService extends ServiceBase {
 constructor(
  @Inject(ContractedRateBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContractedRateBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContractedRateService", loggingService, serviceContext);
 }

    createContractedRate(input: UserCreateContractedRateInput): Observable<ContractedRate> {
        return this.businessProvider.createContractedRate(input);
    }

    updateContractedRate(input: UserUpdateContractedRateInput, contractedRateId: string): Observable<ContractedRate> {
        return this.businessProvider.updateContractedRate(input, contractedRateId);
    }

    importContractedRates(contractedRates: UserUpdateContractedRateInput[]): Observable<boolean> {
        return this.businessProvider.importContractedRates(contractedRates);
    }
}

