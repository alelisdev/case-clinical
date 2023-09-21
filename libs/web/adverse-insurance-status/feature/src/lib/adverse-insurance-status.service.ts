
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AdverseInsuranceStatus, UserCreateAdverseInsuranceStatusInput, UserUpdateAdverseInsuranceStatusInput } from "@case-clinical/shared/util/sdk";
import { AdverseInsuranceStatusBusinessProviderService } from "./business/adverse-insurance-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AdverseInsuranceStatusService extends ServiceBase {
 constructor(
  @Inject(AdverseInsuranceStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AdverseInsuranceStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AdverseInsuranceStatusService", loggingService, serviceContext);
 }

    createAdverseInsuranceStatus(input: UserCreateAdverseInsuranceStatusInput): Observable<AdverseInsuranceStatus> {
        return this.businessProvider.createAdverseInsuranceStatus(input);
    }

    updateAdverseInsuranceStatus(input: UserUpdateAdverseInsuranceStatusInput, adverseInsuranceStatusId: string): Observable<AdverseInsuranceStatus> {
        return this.businessProvider.updateAdverseInsuranceStatus(input, adverseInsuranceStatusId);
    }

    importAdverseInsuranceStatuses(adverseInsuranceStatuses: UserUpdateAdverseInsuranceStatusInput[]): Observable<boolean> {
        return this.businessProvider.importAdverseInsuranceStatuses(adverseInsuranceStatuses);
    }
}

