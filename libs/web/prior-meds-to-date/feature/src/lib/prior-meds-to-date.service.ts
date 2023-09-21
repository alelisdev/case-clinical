
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorMedsToDate, UserCreatePriorMedsToDateInput, UserUpdatePriorMedsToDateInput } from "@case-clinical/shared/util/sdk";
import { PriorMedsToDateBusinessProviderService } from "./business/prior-meds-to-date.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPriorMedsToDate(input);
    }

    updatePriorMedsToDate(input: UserUpdatePriorMedsToDateInput, priorMedsToDateId: string): Observable<PriorMedsToDate> {
        return this.businessProvider.updatePriorMedsToDate(input, priorMedsToDateId);
    }

    importPriorMedsToDates(priorMedsToDates: UserUpdatePriorMedsToDateInput[]): Observable<boolean> {
        return this.businessProvider.importPriorMedsToDates(priorMedsToDates);
    }
}

