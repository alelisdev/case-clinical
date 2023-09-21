
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LeadSource, UserCreateLeadSourceInput, UserUpdateLeadSourceInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { LeadSourceBusinessProviderService } from "./lead-source.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LeadSourceService extends ServiceBase {
 constructor(
  @Inject(LeadSourceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LeadSourceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LeadSourceService", loggingService, serviceContext);
 }

    createLeadSource(input: UserCreateLeadSourceInput): Observable<LeadSource> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLeadSource(filteredObj);
    }

    updateLeadSource(input: UserUpdateLeadSourceInput, leadSourceId: string): Observable<LeadSource> {
        return this.businessProvider.updateLeadSource(input, leadSourceId);
    }

    importLeadSources(leadSources: UserUpdateLeadSourceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLeadSources(leadSources);
    }

    validateLeadSourceExcelData(excelData: any[] ) {
      return this.businessProvider.validateLeadSourceExcelData(excelData );
    }
}

