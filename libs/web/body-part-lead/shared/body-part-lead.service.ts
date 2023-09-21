
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { BodyPartLead, UserCreateBodyPartLeadInput, UserUpdateBodyPartLeadInput, UpdateResult, Lead, BodyPart } from "@case-clinical/shared/util/sdk";
import { BodyPartLeadBusinessProviderService } from "./body-part-lead.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class BodyPartLeadService extends ServiceBase {
 constructor(
  @Inject(BodyPartLeadBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: BodyPartLeadBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("BodyPartLeadService", loggingService, serviceContext);
 }

    createBodyPartLead(input: UserCreateBodyPartLeadInput): Observable<BodyPartLead> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createBodyPartLead(filteredObj);
    }

    updateBodyPartLead(input: UserUpdateBodyPartLeadInput, bodyPartLeadId: string): Observable<BodyPartLead> {
        return this.businessProvider.updateBodyPartLead(input, bodyPartLeadId);
    }

    importBodyPartLeads(bodyPartLeads: UserUpdateBodyPartLeadInput[]): Observable<UpdateResult> {
        return this.businessProvider.importBodyPartLeads(bodyPartLeads);
    }

    validateBodyPartLeadExcelData(excelData: any[], leads: Lead[], bodyParts: BodyPart[]) {
      return this.businessProvider.validateBodyPartLeadExcelData(excelData, leads, bodyParts);
    }
}

