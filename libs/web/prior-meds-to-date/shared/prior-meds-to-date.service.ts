
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorMedsToDate, UserCreatePriorMedsToDateInput, UserUpdatePriorMedsToDateInput, UpdateResult, LegalCase, PriorMedsToDateStatus } from "@case-clinical/shared/util/sdk";
import { PriorMedsToDateBusinessProviderService } from "./prior-meds-to-date.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PriorMedsToDateService extends ServiceBase {
 constructor(
  @Inject(PriorMedsToDateBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorMedsToDateBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorMedsToDateService", loggingService, serviceContext);
 }

    createPriorMedsToDate(input: UserCreatePriorMedsToDateInput): Observable<PriorMedsToDate> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorMedsToDate(filteredObj);
    }

    updatePriorMedsToDate(input: UserUpdatePriorMedsToDateInput, priorMedsToDateId: string): Observable<PriorMedsToDate> {
        return this.businessProvider.updatePriorMedsToDate(input, priorMedsToDateId);
    }

    importPriorMedsToDates(priorMedsToDates: UserUpdatePriorMedsToDateInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorMedsToDates(priorMedsToDates);
    }

    validatePriorMedsToDateExcelData(excelData: any[], legalCases: LegalCase[], priorMedsToDateStatuses: PriorMedsToDateStatus[]) {
      return this.businessProvider.validatePriorMedsToDateExcelData(excelData, legalCases, priorMedsToDateStatuses);
    }
}

