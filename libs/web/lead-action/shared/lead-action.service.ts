
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LeadAction, UserCreateLeadActionInput, UserUpdateLeadActionInput, UpdateResult, Lead } from "@case-clinical/shared/util/sdk";
import { LeadActionBusinessProviderService } from "./lead-action.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LeadActionService extends ServiceBase {
 constructor(
  @Inject(LeadActionBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LeadActionBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LeadActionService", loggingService, serviceContext);
 }

    createLeadAction(input: UserCreateLeadActionInput): Observable<LeadAction> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLeadAction(filteredObj);
    }

    updateLeadAction(input: UserUpdateLeadActionInput, leadActionId: string): Observable<LeadAction> {
        return this.businessProvider.updateLeadAction(input, leadActionId);
    }

    importLeadActions(leadActions: UserUpdateLeadActionInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLeadActions(leadActions);
    }

    validateLeadActionExcelData(excelData: any[], leads: Lead[]) {
      return this.businessProvider.validateLeadActionExcelData(excelData, leads);
    }
}

