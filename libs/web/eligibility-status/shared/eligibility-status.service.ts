
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { EligibilityStatus, UserCreateEligibilityStatusInput, UserUpdateEligibilityStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { EligibilityStatusBusinessProviderService } from "./eligibility-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class EligibilityStatusService extends ServiceBase {
 constructor(
  @Inject(EligibilityStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: EligibilityStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("EligibilityStatusService", loggingService, serviceContext);
 }

    createEligibilityStatus(input: UserCreateEligibilityStatusInput): Observable<EligibilityStatus> {
        return this.businessProvider.createEligibilityStatus(input);
    }

    updateEligibilityStatus(input: UserUpdateEligibilityStatusInput, eligibilityStatusId: string): Observable<EligibilityStatus> {
        return this.businessProvider.updateEligibilityStatus(input, eligibilityStatusId);
    }

    importEligibilityStatuses(eligibilityStatuses: UserUpdateEligibilityStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importEligibilityStatuses(eligibilityStatuses);
    }

    validateEligibilityStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateEligibilityStatusExcelData(excelData );
    }
}

