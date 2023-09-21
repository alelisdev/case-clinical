
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureStatus, UserCreateProcedureStatusInput, UserUpdateProcedureStatusInput } from "@case-clinical/shared/util/sdk";
import { ProcedureStatusBusinessProviderService } from "./business/procedure-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createProcedureStatus(input);
    }

    updateProcedureStatus(input: UserUpdateProcedureStatusInput, procedureStatusId: string): Observable<ProcedureStatus> {
        return this.businessProvider.updateProcedureStatus(input, procedureStatusId);
    }

    importProcedureStatuses(procedureStatuses: UserUpdateProcedureStatusInput[]): Observable<boolean> {
        return this.businessProvider.importProcedureStatuses(procedureStatuses);
    }
}

