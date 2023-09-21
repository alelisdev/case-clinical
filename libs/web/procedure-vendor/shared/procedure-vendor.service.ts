
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureVendor, UserCreateProcedureVendorInput, UserUpdateProcedureVendorInput, UpdateResult, CaseProcedure, Contract, Vendor, ProcedureVendorStatus } from "@case-clinical/shared/util/sdk";
import { ProcedureVendorBusinessProviderService } from "./procedure-vendor.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureVendorService extends ServiceBase {
 constructor(
  @Inject(ProcedureVendorBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureVendorBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureVendorService", loggingService, serviceContext);
 }

    createProcedureVendor(input: UserCreateProcedureVendorInput): Observable<ProcedureVendor> {
        return this.businessProvider.createProcedureVendor(input);
    }

    updateProcedureVendor(input: UserUpdateProcedureVendorInput, procedureVendorId: string): Observable<ProcedureVendor> {
        return this.businessProvider.updateProcedureVendor(input, procedureVendorId);
    }

    importProcedureVendors(procedureVendors: UserUpdateProcedureVendorInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureVendors(procedureVendors);
    }

    validateProcedureVendorExcelData(excelData: any[], procedures: CaseProcedure[], contracts: Contract[], vendors: Vendor[], statuses: ProcedureVendorStatus[]) {
      return this.businessProvider.validateProcedureVendorExcelData(excelData, procedures, contracts, vendors, statuses);
    }
}

