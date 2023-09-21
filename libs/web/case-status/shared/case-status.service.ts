
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseStatus, UserCreateCaseStatusInput, UserUpdateCaseStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { CaseStatusBusinessProviderService } from "./case-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CaseStatusService extends ServiceBase {
 constructor(
  @Inject(CaseStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseStatusService", loggingService, serviceContext);
 }

    createCaseStatus(input: UserCreateCaseStatusInput): Observable<CaseStatus> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCaseStatus(filteredObj);
    }

    updateCaseStatus(input: UserUpdateCaseStatusInput, caseStatusId: string): Observable<CaseStatus> {
        return this.businessProvider.updateCaseStatus(input, caseStatusId);
    }

    importCaseStatuses(caseStatuses: UserUpdateCaseStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCaseStatuses(caseStatuses);
    }

    validateCaseStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateCaseStatusExcelData(excelData );
    }
}

