
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreProcedure, UserCreateCasePreProcedureInput, UserUpdateCasePreProcedureInput, UpdateResult, LegalCase } from "@case-clinical/shared/util/sdk";
import { CasePreProcedureBusinessProviderService } from "./case-pre-procedure.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCasePreProcedure(filteredObj);
    }

    updateCasePreProcedure(input: UserUpdateCasePreProcedureInput, casePreProcedureId: string): Observable<CasePreProcedure> {
        return this.businessProvider.updateCasePreProcedure(input, casePreProcedureId);
    }

    importCasePreProcedures(casePreProcedures: UserUpdateCasePreProcedureInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCasePreProcedures(casePreProcedures);
    }

    validateCasePreProcedureExcelData(excelData: any[], legalCases: LegalCase[]) {
      return this.businessProvider.validateCasePreProcedureExcelData(excelData, legalCases);
    }
}

