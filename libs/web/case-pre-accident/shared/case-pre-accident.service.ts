
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreAccident, UserCreateCasePreAccidentInput, UserUpdateCasePreAccidentInput, UpdateResult, LegalCase } from "@case-clinical/shared/util/sdk";
import { CasePreAccidentBusinessProviderService } from "./case-pre-accident.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CasePreAccidentService extends ServiceBase {
 constructor(
  @Inject(CasePreAccidentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CasePreAccidentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CasePreAccidentService", loggingService, serviceContext);
 }

    createCasePreAccident(input: UserCreateCasePreAccidentInput): Observable<CasePreAccident> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCasePreAccident(filteredObj);
    }

    updateCasePreAccident(input: UserUpdateCasePreAccidentInput, casePreAccidentId: string): Observable<CasePreAccident> {
        return this.businessProvider.updateCasePreAccident(input, casePreAccidentId);
    }

    importCasePreAccidents(casePreAccidents: UserUpdateCasePreAccidentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCasePreAccidents(casePreAccidents);
    }

    validateCasePreAccidentExcelData(excelData: any[], legalCases: LegalCase[], legalCaseId?:string) {
      
        return this.businessProvider.validateCasePreAccidentExcelData(excelData, legalCases, legalCaseId);
    }
}

