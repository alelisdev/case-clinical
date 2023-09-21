
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Contract, UserCreateContractInput, UserUpdateContractInput } from "@case-clinical/shared/util/sdk";
import { ContractBusinessProviderService } from "./business/contract.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContractService extends ServiceBase {
 constructor(
  @Inject(ContractBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContractBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContractService", loggingService, serviceContext);
 }

    createContract(input: UserCreateContractInput): Observable<Contract> {
        return this.businessProvider.createContract(input);
    }

    updateContract(input: UserUpdateContractInput, contractId: string): Observable<Contract> {
        return this.businessProvider.updateContract(input, contractId);
    }

    importContracts(contracts: UserUpdateContractInput[]): Observable<boolean> {
        return this.businessProvider.importContracts(contracts);
    }
}

