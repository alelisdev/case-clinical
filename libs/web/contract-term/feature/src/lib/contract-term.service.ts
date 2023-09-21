
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContractTerm, UserCreateContractTermInput, UserUpdateContractTermInput } from "@case-clinical/shared/util/sdk";
import { ContractTermBusinessProviderService } from "./business/contract-term.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ContractTermService extends ServiceBase {
 constructor(
  @Inject(ContractTermBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContractTermBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContractTermService", loggingService, serviceContext);
 }

    createContractTerm(input: UserCreateContractTermInput): Observable<ContractTerm> {
        return this.businessProvider.createContractTerm(input);
    }

    updateContractTerm(input: UserUpdateContractTermInput, contractTermId: string): Observable<ContractTerm> {
        return this.businessProvider.updateContractTerm(input, contractTermId);
    }

    importContractTerms(contractTerms: UserUpdateContractTermInput[]): Observable<boolean> {
        return this.businessProvider.importContractTerms(contractTerms);
    }
}

