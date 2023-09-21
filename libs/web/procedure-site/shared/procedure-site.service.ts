
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ProcedureSite, UserCreateProcedureSiteInput, UserUpdateProcedureSiteInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ProcedureSiteBusinessProviderService } from "./procedure-site.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createProcedureSite(filteredObj);
    }

    updateProcedureSite(input: UserUpdateProcedureSiteInput, procedureSiteId: string): Observable<ProcedureSite> {
        return this.businessProvider.updateProcedureSite(input, procedureSiteId);
    }

    importProcedureSites(procedureSites: UserUpdateProcedureSiteInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedureSites(procedureSites);
    }

    validateProcedureSiteExcelData(excelData: any[] ) {
      return this.businessProvider.validateProcedureSiteExcelData(excelData );
    }
}

