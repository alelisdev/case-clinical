
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorMedsToDateStatus, UserCreatePriorMedsToDateStatusInput, UserUpdatePriorMedsToDateStatusInput } from "@case-clinical/shared/util/sdk";
import { PriorMedsToDateStatusBusinessProviderService } from "./business/prior-meds-to-date-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createPriorMedsToDateStatus(input);
    }

    updatePriorMedsToDateStatus(input: UserUpdatePriorMedsToDateStatusInput, priorMedsToDateStatusId: string): Observable<PriorMedsToDateStatus> {
        return this.businessProvider.updatePriorMedsToDateStatus(input, priorMedsToDateStatusId);
    }

    importPriorMedsToDateStatuses(priorMedsToDateStatuses: UserUpdatePriorMedsToDateStatusInput[]): Observable<boolean> {
        return this.businessProvider.importPriorMedsToDateStatuses(priorMedsToDateStatuses);
    }
}

