
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ContractedRate, UserCreateContractedRateInput, UserUpdateContractedRateInput, UpdateResult, Contract, ContractedRateKind, ContractKind, VisitKind, ClinicalProvider, Specialty } from "@case-clinical/shared/util/sdk";
import { ContractedRateBusinessProviderService } from "./contracted-rate.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContractedRate(filteredObj);
    }

    updateContractedRate(input: UserUpdateContractedRateInput, contractedRateId: string): Observable<ContractedRate> {
        return this.businessProvider.updateContractedRate(input, contractedRateId);
    }

    importContractedRates(contractedRates: UserUpdateContractedRateInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContractedRates(contractedRates);
    }

    validateContractedRateExcelData(excelData: any[], contracts: Contract[], contractedRateKinds: ContractedRateKind[], contractKinds: ContractKind[], visitKinds: VisitKind[], clinicalProviders: ClinicalProvider[], specialties: Specialty[]) {
      return this.businessProvider.validateContractedRateExcelData(excelData, contracts, contractedRateKinds, contractKinds, visitKinds, clinicalProviders, specialties);
    }
}

