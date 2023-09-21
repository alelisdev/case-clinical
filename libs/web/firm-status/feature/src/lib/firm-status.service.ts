
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FirmStatus, UserCreateFirmStatusInput, UserUpdateFirmStatusInput } from "@case-clinical/shared/util/sdk";
import { FirmStatusBusinessProviderService } from "./business/firm-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class FirmStatusService extends ServiceBase {
 constructor(
  @Inject(FirmStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FirmStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FirmStatusService", loggingService, serviceContext);
 }

    createFirmStatus(input: UserCreateFirmStatusInput): Observable<FirmStatus> {
        return this.businessProvider.createFirmStatus(input);
    }

    updateFirmStatus(input: UserUpdateFirmStatusInput, firmStatusId: string): Observable<FirmStatus> {
        return this.businessProvider.updateFirmStatus(input, firmStatusId);
    }

    importFirmStatuses(firmStatuses: UserUpdateFirmStatusInput[]): Observable<boolean> {
        return this.businessProvider.importFirmStatuses(firmStatuses);
    }
}

