
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContractKind, UserCreateContractKindInput, UserUpdateContractKindInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ContractKindBusinessProviderService } from "./contract-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ContractKindService extends ServiceBase {
 constructor(
  @Inject(ContractKindBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ContractKindBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ContractKindService", loggingService, serviceContext);
 }

    createContractKind(input: UserCreateContractKindInput): Observable<ContractKind> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContractKind(filteredObj);
    }

    updateContractKind(input: UserUpdateContractKindInput, contractKindId: string): Observable<ContractKind> {
        return this.businessProvider.updateContractKind(input, contractKindId);
    }

    importContractKinds(contractKinds: UserUpdateContractKindInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContractKinds(contractKinds);
    }

    validateContractKindExcelData(excelData: any[] ) {
      return this.businessProvider.validateContractKindExcelData(excelData );
    }
}

