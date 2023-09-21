
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClaimStatus, UserCreateClaimStatusInput, UserUpdateClaimStatusInput } from "@case-clinical/shared/util/sdk";
import { ClaimStatusBusinessProviderService } from "./business/claim-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ClaimStatusService extends ServiceBase {
 constructor(
  @Inject(ClaimStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClaimStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClaimStatusService", loggingService, serviceContext);
 }

    createClaimStatus(input: UserCreateClaimStatusInput): Observable<ClaimStatus> {
        return this.businessProvider.createClaimStatus(input);
    }

    updateClaimStatus(input: UserUpdateClaimStatusInput, claimStatusId: string): Observable<ClaimStatus> {
        return this.businessProvider.updateClaimStatus(input, claimStatusId);
    }

    importClaimStatuses(claimStatuses: UserUpdateClaimStatusInput[]): Observable<boolean> {
        return this.businessProvider.importClaimStatuses(claimStatuses);
    }
}

