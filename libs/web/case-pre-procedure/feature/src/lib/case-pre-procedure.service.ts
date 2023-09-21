
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreProcedure, UserCreateCasePreProcedureInput, UserUpdateCasePreProcedureInput } from "@case-clinical/shared/util/sdk";
import { CasePreProcedureBusinessProviderService } from "./business/case-pre-procedure.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class CasePreProcedureService extends ServiceBase {
 constructor(
  @Inject(CasePreProcedureBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CasePreProcedureBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CasePreProcedureService", loggingService, serviceContext);
 }

    createCasePreProcedure(input: UserCreateCasePreProcedureInput): Observable<CasePreProcedure> {
        return this.businessProvider.createCasePreProcedure(input);
    }

    updateCasePreProcedure(input: UserUpdateCasePreProcedureInput, casePreProcedureId: string): Observable<CasePreProcedure> {
        return this.businessProvider.updateCasePreProcedure(input, casePreProcedureId);
    }

    importCasePreProcedures(casePreProcedures: UserUpdateCasePreProcedureInput[]): Observable<boolean> {
        return this.businessProvider.importCasePreProcedures(casePreProcedures);
    }
}

