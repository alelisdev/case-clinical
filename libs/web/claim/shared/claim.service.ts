
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Claim, UserCreateClaimInput, UserUpdateClaimInput, UpdateResult, PriorAuthorizationRequest, Document, Patient } from "@case-clinical/shared/util/sdk";
import { ClaimBusinessProviderService } from "./claim.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClaim(filteredObj);
    }

    updateClaim(input: UserUpdateClaimInput, claimId: string): Observable<Claim> {
        return this.businessProvider.updateClaim(input, claimId);
    }

    importClaims(claims: UserUpdateClaimInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClaims(claims);
    }

    validateClaimExcelData(excelData: any[], priorAuthorizationRequests: PriorAuthorizationRequest[], claims: Document[], explanationOfPayments: Document[], patients: Patient[]) {
      return this.businessProvider.validateClaimExcelData(excelData, priorAuthorizationRequests, claims, explanationOfPayments, patients);
    }
}

