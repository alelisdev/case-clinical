
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClaimStatus, UserCreateClaimStatusInput, UserUpdateClaimStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ClaimStatusBusinessProviderService } from "./claim-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createClaimStatus(filteredObj);
    }

    updateClaimStatus(input: UserUpdateClaimStatusInput, claimStatusId: string): Observable<ClaimStatus> {
        return this.businessProvider.updateClaimStatus(input, claimStatusId);
    }

    importClaimStatuses(claimStatuses: UserUpdateClaimStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClaimStatuses(claimStatuses);
    }

    validateClaimStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateClaimStatusExcelData(excelData );
    }
}

