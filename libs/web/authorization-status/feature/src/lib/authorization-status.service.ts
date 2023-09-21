
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationStatus, UserCreateAuthorizationStatusInput, UserUpdateAuthorizationStatusInput } from "@case-clinical/shared/util/sdk";
import { AuthorizationStatusBusinessProviderService } from "./business/authorization-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AuthorizationStatusService extends ServiceBase {
 constructor(
  @Inject(AuthorizationStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AuthorizationStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AuthorizationStatusService", loggingService, serviceContext);
 }

    createAuthorizationStatus(input: UserCreateAuthorizationStatusInput): Observable<AuthorizationStatus> {
        return this.businessProvider.createAuthorizationStatus(input);
    }

    updateAuthorizationStatus(input: UserUpdateAuthorizationStatusInput, authorizationStatusId: string): Observable<AuthorizationStatus> {
        return this.businessProvider.updateAuthorizationStatus(input, authorizationStatusId);
    }

    importAuthorizationStatuses(authorizationStatuses: UserUpdateAuthorizationStatusInput[]): Observable<boolean> {
        return this.businessProvider.importAuthorizationStatuses(authorizationStatuses);
    }
}

