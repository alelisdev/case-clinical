
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorMedsToDateStatus, UserCreatePriorMedsToDateStatusInput, UserUpdatePriorMedsToDateStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { PriorMedsToDateStatusBusinessProviderService } from "./prior-meds-to-date-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class PriorMedsToDateStatusService extends ServiceBase {
 constructor(
  @Inject(PriorMedsToDateStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorMedsToDateStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorMedsToDateStatusService", loggingService, serviceContext);
 }

    createPriorMedsToDateStatus(input: UserCreatePriorMedsToDateStatusInput): Observable<PriorMedsToDateStatus> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createPriorMedsToDateStatus(filteredObj);
    }

    updatePriorMedsToDateStatus(input: UserUpdatePriorMedsToDateStatusInput, priorMedsToDateStatusId: string): Observable<PriorMedsToDateStatus> {
        return this.businessProvider.updatePriorMedsToDateStatus(input, priorMedsToDateStatusId);
    }

    importPriorMedsToDateStatuses(priorMedsToDateStatuses: UserUpdatePriorMedsToDateStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importPriorMedsToDateStatuses(priorMedsToDateStatuses);
    }

    validatePriorMedsToDateStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validatePriorMedsToDateStatusExcelData(excelData );
    }
}

