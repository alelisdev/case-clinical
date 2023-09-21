
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ClaimProcedure, UserCreateClaimProcedureInput, UserUpdateClaimProcedureInput, UpdateResult, PlaceOfService, ClaimStatus, Claim, Appointment, Procedure } from "@case-clinical/shared/util/sdk";
import { ClaimProcedureBusinessProviderService } from "./claim-procedure.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ClaimProcedureService extends ServiceBase {
 constructor(
  @Inject(ClaimProcedureBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ClaimProcedureBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ClaimProcedureService", loggingService, serviceContext);
 }

    createClaimProcedure(input: UserCreateClaimProcedureInput): Observable<ClaimProcedure> {
        return this.businessProvider.createClaimProcedure(input);
    }

    updateClaimProcedure(input: UserUpdateClaimProcedureInput, claimProcedureId: string): Observable<ClaimProcedure> {
        return this.businessProvider.updateClaimProcedure(input, claimProcedureId);
    }

    importClaimProcedures(claimProcedures: UserUpdateClaimProcedureInput[]): Observable<UpdateResult> {
        return this.businessProvider.importClaimProcedures(claimProcedures);
    }

    validateClaimProcedureExcelData(excelData: any[], placeOfServices: PlaceOfService[], claimStatuses: ClaimStatus[], claims: Claim[], appointments: Appointment[], procedures: Procedure[]) {
      return this.businessProvider.validateClaimProcedureExcelData(excelData, placeOfServices, claimStatuses, claims, appointments, procedures);
    }
}

