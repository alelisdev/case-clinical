
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { PriorAuthorizationRequest, UserCreatePriorAuthorizationRequestInput, UserUpdatePriorAuthorizationRequestInput } from "@case-clinical/shared/util/sdk";
import { PriorAuthorizationRequestBusinessProviderService } from "./business/prior-authorization-request.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class PriorAuthorizationRequestService extends ServiceBase {
 constructor(
  @Inject(PriorAuthorizationRequestBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: PriorAuthorizationRequestBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("PriorAuthorizationRequestService", loggingService, serviceContext);
 }

    createPriorAuthorizationRequest(input: UserCreatePriorAuthorizationRequestInput): Observable<PriorAuthorizationRequest> {
        return this.businessProvider.createPriorAuthorizationRequest(input);
    }

    updatePriorAuthorizationRequest(input: UserUpdatePriorAuthorizationRequestInput, priorAuthorizationRequestId: string): Observable<PriorAuthorizationRequest> {
        return this.businessProvider.updatePriorAuthorizationRequest(input, priorAuthorizationRequestId);
    }

    importPriorAuthorizationRequests(priorAuthorizationRequests: UserUpdatePriorAuthorizationRequestInput[]): Observable<boolean> {
        return this.businessProvider.importPriorAuthorizationRequests(priorAuthorizationRequests);
    }
}

