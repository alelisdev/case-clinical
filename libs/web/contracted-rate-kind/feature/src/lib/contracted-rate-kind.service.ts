
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContractedRateKind, UserCreateContractedRateKindInput, UserUpdateContractedRateKindInput } from "@case-clinical/shared/util/sdk";
import { ContractedRateKindBusinessProviderService } from "./business/contracted-rate-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContractedRateKindService extends ServiceBase {
 constructor(
  @Inject(ContractedRateKindBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContractedRateKindBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContractedRateKindService", loggingService, serviceContext);
 }

    createContractedRateKind(input: UserCreateContractedRateKindInput): Observable<ContractedRateKind> {
        return this.businessProvider.createContractedRateKind(input);
    }

    updateContractedRateKind(input: UserUpdateContractedRateKindInput, contractedRateKindId: string): Observable<ContractedRateKind> {
        return this.businessProvider.updateContractedRateKind(input, contractedRateKindId);
    }

    importContractedRateKinds(contractedRateKinds: UserUpdateContractedRateKindInput[]): Observable<boolean> {
        return this.businessProvider.importContractedRateKinds(contractedRateKinds);
    }
}

