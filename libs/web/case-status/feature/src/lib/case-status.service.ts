
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { CaseStatus, UserCreateCaseStatusInput, UserUpdateCaseStatusInput } from "@case-clinical/shared/util/sdk";
import { CaseStatusBusinessProviderService } from "./business/case-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createCaseStatus(input);
    }

    updateCaseStatus(input: UserUpdateCaseStatusInput, caseStatusId: string): Observable<CaseStatus> {
        return this.businessProvider.updateCaseStatus(input, caseStatusId);
    }

    importCaseStatuses(caseStatuses: UserUpdateCaseStatusInput[]): Observable<boolean> {
        return this.businessProvider.importCaseStatuses(caseStatuses);
    }
}

