
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { LeadTreatment, UserCreateLeadTreatmentInput, UserUpdateLeadTreatmentInput, UpdateResult, Lead, Treatment } from "@case-clinical/shared/util/sdk";
import { LeadTreatmentBusinessProviderService } from "./lead-treatment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LeadTreatmentService extends ServiceBase {
 constructor(
  @Inject(LeadTreatmentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LeadTreatmentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LeadTreatmentService", loggingService, serviceContext);
 }

    createLeadTreatment(input: UserCreateLeadTreatmentInput): Observable<LeadTreatment> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLeadTreatment(filteredObj);
    }

    updateLeadTreatment(input: UserUpdateLeadTreatmentInput, leadTreatmentId: string): Observable<LeadTreatment> {
        return this.businessProvider.updateLeadTreatment(input, leadTreatmentId);
    }

    importLeadTreatments(leadTreatments: UserUpdateLeadTreatmentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLeadTreatments(leadTreatments);
    }

    validateLeadTreatmentExcelData(excelData: any[], leads: Lead[], treatments: Treatment[]) {
      return this.businessProvider.validateLeadTreatmentExcelData(excelData, leads, treatments);
    }
}

