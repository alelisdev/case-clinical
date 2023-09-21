
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureStatus, UserCreateProcedureStatusInput, UserUpdateProcedureStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ProcedureStatusBusinessProviderService } from "./procedure-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureStatusService extends ServiceBase {
 constructor(
  @Inject(ProcedureStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureStatusService", loggingService, serviceContext);
 }

    createProcedureStatus(input: UserCreateProcedureStatusInput): Observable<ProcedureStatus> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createProcedureStatus(filteredObj);
    }

    updateProcedureStatus(input: UserUpdateProcedureStatusInput, procedureStatusId: string): Observable<ProcedureStatus> {
        return this.businessProvider.updateProcedureStatus(input, procedureStatusId);
    }

    importProcedureStatuses(procedureStatuses: UserUpdateProcedureStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureStatuses(procedureStatuses);
    }

    validateProcedureStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateProcedureStatusExcelData(excelData );
    }
}

