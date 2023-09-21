
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { WriteOffStatus, UserCreateWriteOffStatusInput, UserUpdateWriteOffStatusInput } from "@case-clinical/shared/util/sdk";
import { WriteOffStatusBusinessProviderService } from "./business/write-off-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class WriteOffStatusService extends ServiceBase {
 constructor(
  @Inject(WriteOffStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: WriteOffStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("WriteOffStatusService", loggingService, serviceContext);
 }

    createWriteOffStatus(input: UserCreateWriteOffStatusInput): Observable<WriteOffStatus> {
        return this.businessProvider.createWriteOffStatus(input);
    }

    updateWriteOffStatus(input: UserUpdateWriteOffStatusInput, writeOffStatusId: string): Observable<WriteOffStatus> {
        return this.businessProvider.updateWriteOffStatus(input, writeOffStatusId);
    }

    importWriteOffStatuses(writeOffStatuses: UserUpdateWriteOffStatusInput[]): Observable<boolean> {
        return this.businessProvider.importWriteOffStatuses(writeOffStatuses);
    }
}

