
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AttorneyStatus, UserCreateAttorneyStatusInput, UserUpdateAttorneyStatusInput } from "@case-clinical/shared/util/sdk";
import { AttorneyStatusBusinessProviderService } from "./business/attorney-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AttorneyStatusService extends ServiceBase {
 constructor(
  @Inject(AttorneyStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AttorneyStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AttorneyStatusService", loggingService, serviceContext);
 }

    createAttorneyStatus(input: UserCreateAttorneyStatusInput): Observable<AttorneyStatus> {
        return this.businessProvider.createAttorneyStatus(input);
    }

    updateAttorneyStatus(input: UserUpdateAttorneyStatusInput, attorneyStatusId: string): Observable<AttorneyStatus> {
        return this.businessProvider.updateAttorneyStatus(input, attorneyStatusId);
    }

    importAttorneyStatuses(attorneyStatuses: UserUpdateAttorneyStatusInput[]): Observable<boolean> {
        return this.businessProvider.importAttorneyStatuses(attorneyStatuses);
    }
}

