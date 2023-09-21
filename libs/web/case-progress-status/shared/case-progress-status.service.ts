
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseProgressStatus, UserCreateCaseProgressStatusInput, UserUpdateCaseProgressStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { CaseProgressStatusBusinessProviderService } from "./case-progress-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CaseProgressStatusService extends ServiceBase {
 constructor(
  @Inject(CaseProgressStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CaseProgressStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CaseProgressStatusService", loggingService, serviceContext);
 }

    createCaseProgressStatus(input: UserCreateCaseProgressStatusInput): Observable<CaseProgressStatus> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCaseProgressStatus(filteredObj);
    }

    updateCaseProgressStatus(input: UserUpdateCaseProgressStatusInput, caseProgressStatusId: string): Observable<CaseProgressStatus> {
        return this.businessProvider.updateCaseProgressStatus(input, caseProgressStatusId);
    }

    importCaseProgressStatuses(caseProgressStatuses: UserUpdateCaseProgressStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCaseProgressStatuses(caseProgressStatuses);
    }

    validateCaseProgressStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateCaseProgressStatusExcelData(excelData );
    }
}

