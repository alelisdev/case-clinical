
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LeadInjury, UserCreateLeadInjuryInput, UserUpdateLeadInjuryInput, UpdateResult, Lead, Severity } from "@case-clinical/shared/util/sdk";
import { LeadInjuryBusinessProviderService } from "./lead-injury.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LeadInjuryService extends ServiceBase {
 constructor(
  @Inject(LeadInjuryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LeadInjuryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LeadInjuryService", loggingService, serviceContext);
 }

    createLeadInjury(input: UserCreateLeadInjuryInput): Observable<LeadInjury> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLeadInjury(filteredObj);
    }

    updateLeadInjury(input: UserUpdateLeadInjuryInput, leadInjuryId: string): Observable<LeadInjury> {
        return this.businessProvider.updateLeadInjury(input, leadInjuryId);
    }

    importLeadInjuries(leadInjuries: UserUpdateLeadInjuryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLeadInjuries(leadInjuries);
    }

    validateLeadInjuryExcelData(excelData: any[], leads: Lead[], severities: Severity[]) {
      return this.businessProvider.validateLeadInjuryExcelData(excelData, leads, severities);
    }
}

