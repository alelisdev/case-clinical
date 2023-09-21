
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureVendorStatus, UserCreateProcedureVendorStatusInput, UserUpdateProcedureVendorStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ProcedureVendorStatusBusinessProviderService } from "./procedure-vendor-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureVendorStatusService extends ServiceBase {
 constructor(
  @Inject(ProcedureVendorStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureVendorStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureVendorStatusService", loggingService, serviceContext);
 }

    createProcedureVendorStatus(input: UserCreateProcedureVendorStatusInput): Observable<ProcedureVendorStatus> {
        return this.businessProvider.createProcedureVendorStatus(input);
    }

    updateProcedureVendorStatus(input: UserUpdateProcedureVendorStatusInput, procedureVendorStatusId: string): Observable<ProcedureVendorStatus> {
        return this.businessProvider.updateProcedureVendorStatus(input, procedureVendorStatusId);
    }

    importProcedureVendorStatuses(procedureVendorStatuses: UserUpdateProcedureVendorStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureVendorStatuses(procedureVendorStatuses);
    }

    validateProcedureVendorStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateProcedureVendorStatusExcelData(excelData );
    }
}

