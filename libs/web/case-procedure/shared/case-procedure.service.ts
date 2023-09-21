
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseProcedure, UserCreateCaseProcedureInput, UserUpdateCaseProcedureInput, UpdateResult, LegalCase, Appointment, Location } from "@case-clinical/shared/util/sdk";
import { CaseProcedureBusinessProviderService } from "./case-procedure.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCaseProcedure(filteredObj);
    }

    updateCaseProcedure(input: UserUpdateCaseProcedureInput, caseProcedureId: string): Observable<CaseProcedure> {
        return this.businessProvider.updateCaseProcedure(input, caseProcedureId);
    }

    importCaseProcedures(caseProcedures: UserUpdateCaseProcedureInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCaseProcedures(caseProcedures);
    }

    validateCaseProcedureExcelData(excelData: any[], legalCases: LegalCase[], appointments: Appointment[], locations: Location[]) {
      return this.businessProvider.validateCaseProcedureExcelData(excelData, legalCases, appointments, locations);
    }
}

