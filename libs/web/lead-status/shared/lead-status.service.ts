
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LeadStatus, UserCreateLeadStatusInput, UserUpdateLeadStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { LeadStatusBusinessProviderService } from "./lead-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LeadStatusService extends ServiceBase {
 constructor(
  @Inject(LeadStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LeadStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LeadStatusService", loggingService, serviceContext);
 }

    createLeadStatus(input: UserCreateLeadStatusInput): Observable<LeadStatus> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLeadStatus(filteredObj);
    }

    updateLeadStatus(input: UserUpdateLeadStatusInput, leadStatusId: string): Observable<LeadStatus> {
        return this.businessProvider.updateLeadStatus(input, leadStatusId);
    }

    importLeadStatuses(leadStatuses: UserUpdateLeadStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLeadStatuses(leadStatuses);
    }

    validateLeadStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateLeadStatusExcelData(excelData );
    }
}

