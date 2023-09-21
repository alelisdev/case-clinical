
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Claim, UserCreateClaimInput, UserUpdateClaimInput } from "@case-clinical/shared/util/sdk";
import { ClaimBusinessProviderService } from "./business/claim.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ClaimService extends ServiceBase {
 constructor(
  @Inject(ClaimBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClaimBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClaimService", loggingService, serviceContext);
 }

    createClaim(input: UserCreateClaimInput): Observable<Claim> {
        return this.businessProvider.createClaim(input);
    }

    updateClaim(input: UserUpdateClaimInput, claimId: string): Observable<Claim> {
        return this.businessProvider.updateClaim(input, claimId);
    }

    importClaims(claims: UserUpdateClaimInput[]): Observable<boolean> {
        return this.businessProvider.importClaims(claims);
    }
}

