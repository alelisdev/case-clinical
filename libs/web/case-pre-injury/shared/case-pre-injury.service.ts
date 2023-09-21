
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CasePreInjury, UserCreateCasePreInjuryInput, UserUpdateCasePreInjuryInput, UpdateResult, LegalCase } from "@case-clinical/shared/util/sdk";
import { CasePreInjuryBusinessProviderService } from "./case-pre-injury.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CasePreInjuryService extends ServiceBase {
 constructor(
  @Inject(CasePreInjuryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CasePreInjuryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CasePreInjuryService", loggingService, serviceContext);
 }

    createCasePreInjury(input: UserCreateCasePreInjuryInput): Observable<CasePreInjury> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCasePreInjury(filteredObj);
    }

    updateCasePreInjury(input: UserUpdateCasePreInjuryInput, casePreInjuryId: string): Observable<CasePreInjury> {
        return this.businessProvider.updateCasePreInjury(input, casePreInjuryId);
    }

    importCasePreInjuries(casePreInjuries: UserUpdateCasePreInjuryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCasePreInjuries(casePreInjuries);
    }

    validateCasePreInjuryExcelData(excelData: any[], legalCases: LegalCase[]) {
      return this.businessProvider.validateCasePreInjuryExcelData(excelData, legalCases);
    }
}

