
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationKind, UserCreateAuthorizationKindInput, UserUpdateAuthorizationKindInput } from "@case-clinical/shared/util/sdk";
import { AuthorizationKindBusinessProviderService } from "./business/authorization-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AuthorizationKindService extends ServiceBase {
 constructor(
  @Inject(AuthorizationKindBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AuthorizationKindBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AuthorizationKindService", loggingService, serviceContext);
 }

    createAuthorizationKind(input: UserCreateAuthorizationKindInput): Observable<AuthorizationKind> {
        return this.businessProvider.createAuthorizationKind(input);
    }

    updateAuthorizationKind(input: UserUpdateAuthorizationKindInput, authorizationKindId: string): Observable<AuthorizationKind> {
        return this.businessProvider.updateAuthorizationKind(input, authorizationKindId);
    }

    importAuthorizationKinds(authorizationKinds: UserUpdateAuthorizationKindInput[]): Observable<boolean> {
        return this.businessProvider.importAuthorizationKinds(authorizationKinds);
    }
}

