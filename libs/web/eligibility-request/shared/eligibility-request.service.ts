
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { EligibilityRequest, UserCreateEligibilityRequestInput, UserUpdateEligibilityRequestInput, UpdateResult, EligibilityStatus } from "@case-clinical/shared/util/sdk";
import { EligibilityRequestBusinessProviderService } from "./eligibility-request.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class EligibilityRequestService extends ServiceBase {
 constructor(
  @Inject(EligibilityRequestBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: EligibilityRequestBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("EligibilityRequestService", loggingService, serviceContext);
 }

    createEligibilityRequest(input: UserCreateEligibilityRequestInput): Observable<EligibilityRequest> {
        return this.businessProvider.createEligibilityRequest(input);
    }

    updateEligibilityRequest(input: UserUpdateEligibilityRequestInput, eligibilityRequestId: string): Observable<EligibilityRequest> {
        return this.businessProvider.updateEligibilityRequest(input, eligibilityRequestId);
    }

    importEligibilityRequests(eligibilityRequests: UserUpdateEligibilityRequestInput[]): Observable<UpdateResult> {
        return this.businessProvider.importEligibilityRequests(eligibilityRequests);
    }

    validateEligibilityRequestExcelData(excelData: any[], elegibilityStatuses: EligibilityStatus[]) {
      return this.businessProvider.validateEligibilityRequestExcelData(excelData, elegibilityStatuses);
    }
}

