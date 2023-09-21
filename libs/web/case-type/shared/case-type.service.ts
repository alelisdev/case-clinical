
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseType, UserCreateCaseTypeInput, UserUpdateCaseTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { CaseTypeBusinessProviderService } from "./case-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CaseTypeService extends ServiceBase {
 constructor(
  @Inject(CaseTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseTypeService", loggingService, serviceContext);
 }

    createCaseType(input: UserCreateCaseTypeInput): Observable<CaseType> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCaseType(filteredObj);
    }

    updateCaseType(input: UserUpdateCaseTypeInput, caseTypeId: string): Observable<CaseType> {
        return this.businessProvider.updateCaseType(input, caseTypeId);
    }

    importCaseTypes(caseTypes: UserUpdateCaseTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCaseTypes(caseTypes);
    }

    validateCaseTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateCaseTypeExcelData(excelData );
    }
}

