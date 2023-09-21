
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationStatus, UserCreateAuthorizationStatusInput, UserUpdateAuthorizationStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AuthorizationStatusBusinessProviderService } from "./authorization-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAuthorizationStatus(filteredObj);
    }

    updateAuthorizationStatus(input: UserUpdateAuthorizationStatusInput, authorizationStatusId: string): Observable<AuthorizationStatus> {
        return this.businessProvider.updateAuthorizationStatus(input, authorizationStatusId);
    }

    importAuthorizationStatuses(authorizationStatuses: UserUpdateAuthorizationStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAuthorizationStatuses(authorizationStatuses);
    }

    validateAuthorizationStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateAuthorizationStatusExcelData(excelData );
    }
}

