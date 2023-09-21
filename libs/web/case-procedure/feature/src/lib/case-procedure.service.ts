
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseProcedure, UserCreateCaseProcedureInput, UserUpdateCaseProcedureInput } from "@case-clinical/shared/util/sdk";
import { CaseProcedureBusinessProviderService } from "./business/case-procedure.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CaseProcedureService extends ServiceBase {
 constructor(
  @Inject(CaseProcedureBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseProcedureBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseProcedureService", loggingService, serviceContext);
 }

    createCaseProcedure(input: UserCreateCaseProcedureInput): Observable<CaseProcedure> {
        return this.businessProvider.createCaseProcedure(input);
    }

    updateCaseProcedure(input: UserUpdateCaseProcedureInput, caseProcedureId: string): Observable<CaseProcedure> {
        return this.businessProvider.updateCaseProcedure(input, caseProcedureId);
    }

    importCaseProcedures(caseProcedures: UserUpdateCaseProcedureInput[]): Observable<boolean> {
        return this.businessProvider.importCaseProcedures(caseProcedures);
    }
}

