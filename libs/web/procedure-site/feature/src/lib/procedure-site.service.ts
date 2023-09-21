
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureSite, UserCreateProcedureSiteInput, UserUpdateProcedureSiteInput } from "@case-clinical/shared/util/sdk";
import { ProcedureSiteBusinessProviderService } from "./business/procedure-site.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ProcedureSiteService extends ServiceBase {
 constructor(
  @Inject(ProcedureSiteBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureSiteBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureSiteService", loggingService, serviceContext);
 }

    createProcedureSite(input: UserCreateProcedureSiteInput): Observable<ProcedureSite> {
        return this.businessProvider.createProcedureSite(input);
    }

    updateProcedureSite(input: UserUpdateProcedureSiteInput, procedureSiteId: string): Observable<ProcedureSite> {
        return this.businessProvider.updateProcedureSite(input, procedureSiteId);
    }

    importProcedureSites(procedureSites: UserUpdateProcedureSiteInput[]): Observable<boolean> {
        return this.businessProvider.importProcedureSites(procedureSites);
    }
}

