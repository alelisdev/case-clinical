
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ReferralRequest, UserCreateReferralRequestInput, UserUpdateReferralRequestInput, UpdateResult, Patient, LegalCase, ClinicalProvider, ClinicalProviderLocation } from "@case-clinical/shared/util/sdk";
import { ReferralRequestBusinessProviderService } from "./referral-request.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ReferralRequestService extends ServiceBase {
 constructor(
  @Inject(ReferralRequestBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ReferralRequestBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ReferralRequestService", loggingService, serviceContext);
 }

    createReferralRequest(input: UserCreateReferralRequestInput): Observable<ReferralRequest> {
        return this.businessProvider.createReferralRequest(input);
    }

    updateReferralRequest(input: UserUpdateReferralRequestInput, referralRequestId: string): Observable<ReferralRequest> {
        return this.businessProvider.updateReferralRequest(input, referralRequestId);
    }

    importReferralRequests(referralRequests: UserUpdateReferralRequestInput[]): Observable<UpdateResult> {
        return this.businessProvider.importReferralRequests(referralRequests);
    }

    validateReferralRequestExcelData(excelData: any[], patients: Patient[], legalCases: LegalCase[], requestingProviders: ClinicalProvider[], referredTos: ClinicalProvider[], referredToLocations: ClinicalProviderLocation[]) {
      return this.businessProvider.validateReferralRequestExcelData(excelData, patients, legalCases, requestingProviders, referredTos, referredToLocations);
    }
}

