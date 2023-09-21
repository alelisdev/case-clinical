
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Contract, UserCreateContractInput, UserUpdateContractInput, UpdateResult, Organization, Template, Vendor, ReconciliationPeriodType, CalculationBasisType, Process } from "@case-clinical/shared/util/sdk";
import { ContractBusinessProviderService } from "./contract.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createContract(filteredObj);
    }

    updateContract(input: UserUpdateContractInput, contractId: string): Observable<Contract> {
        return this.businessProvider.updateContract(input, contractId);
    }

    importContracts(contracts: UserUpdateContractInput[]): Observable<UpdateResult> {
        return this.businessProvider.importContracts(contracts);
    }

    checkRequiredFields(excelData): Observable<any> {
      return this.businessProvider.validateRequredFields(excelData);
    }

    validateContractExcelData(excelData: any[], organizations: Organization[], billingOrganizations: Organization[], templates: Template[], vendors: Vendor[], reconciliationPeriodTypes: ReconciliationPeriodType[], calculationBasisTypes: CalculationBasisType[], processes: Process[]) {
      return this.businessProvider.validateContractExcelData(excelData, organizations, billingOrganizations, templates, vendors, reconciliationPeriodTypes, calculationBasisTypes, processes);
    }
}

