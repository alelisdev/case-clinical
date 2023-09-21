
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Procedure, UserCreateProcedureInput, UserUpdateProcedureInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ProcedureBusinessProviderService } from "./procedure.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcedureService extends ServiceBase {
 constructor(
  @Inject(ProcedureBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcedureBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcedureService", loggingService, serviceContext);
 }

    createProcedure(input: UserCreateProcedureInput): Observable<Procedure> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createProcedure(filteredObj);
    }

    updateProcedure(input: UserUpdateProcedureInput, procedureId: string): Observable<Procedure> {
        return this.businessProvider.updateProcedure(input, procedureId);
    }

    importProcedures(procedures: UserUpdateProcedureInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcedures(procedures);
    }

    validateProcedureExcelData(excelData: any[] ) {
      return this.businessProvider.validateProcedureExcelData(excelData );
    }
}

