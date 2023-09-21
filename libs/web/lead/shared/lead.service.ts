
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Lead, UserCreateLeadInput, UserUpdateLeadInput, UpdateResult, AccidentType, Document, LeadStatus, LeadSource, User } from "@case-clinical/shared/util/sdk";
import { LeadBusinessProviderService } from "./lead.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LeadService extends ServiceBase {
 constructor(
  @Inject(LeadBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LeadBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LeadService", loggingService, serviceContext);
 }

    createLead(input: UserCreateLeadInput): Observable<Lead> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLead(filteredObj);
    }

    updateLead(input: UserUpdateLeadInput, leadId: string): Observable<Lead> {
        return this.businessProvider.updateLead(input, leadId);
    }

    userSyncMrnToPharmacy(input: UserUpdateLeadInput): Observable<boolean> {
        return this.businessProvider.userSyncMrnToPharmacy(input);
    }

    importLeads(leads: UserUpdateLeadInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLeads(leads);
    }

    validateLeadExcelData(excelData: any[], accidentTypes: AccidentType[], statuses: LeadStatus[], sourceOfLeads: LeadSource[], submittedBies: User[]) {
      return this.businessProvider.validateLeadExcelData(excelData, accidentTypes, statuses, sourceOfLeads, submittedBies);
    }


}

