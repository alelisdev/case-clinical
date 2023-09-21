
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContractTerm, UserCreateContractTermInput, UserUpdateContractTermInput, UpdateResult, Contract } from "@case-clinical/shared/util/sdk";
import { ContractTermBusinessProviderService } from "./contract-term.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContractTerm(filteredObj);
    }

    updateContractTerm(input: UserUpdateContractTermInput, contractTermId: string): Observable<ContractTerm> {
        return this.businessProvider.updateContractTerm(input, contractTermId);
    }

    importContractTerms(contractTerms: UserUpdateContractTermInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContractTerms(contractTerms);
    }

    validateContractTermExcelData(excelData: any[], contracts: Contract[]) {
      return this.businessProvider.validateContractTermExcelData(excelData, contracts);
    }
}

