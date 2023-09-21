
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Authorization, UserCreateAuthorizationInput, UserUpdateAuthorizationInput, UpdateResult, Vendor, AuthorizationCategory, AuthorizationType, Procedure } from "@case-clinical/shared/util/sdk";
import { AuthorizationBusinessProviderService } from "./authorization.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AuthorizationService extends ServiceBase {
 constructor(
  @Inject(AuthorizationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AuthorizationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AuthorizationService", loggingService, serviceContext);
 }

    createAuthorization(input: UserCreateAuthorizationInput): Observable<Authorization> {
        return this.businessProvider.createAuthorization(input);
    }

    updateAuthorization(input: UserUpdateAuthorizationInput, authorizationId: string): Observable<Authorization> {
        return this.businessProvider.updateAuthorization(input, authorizationId);
    }

    importAuthorizations(authorizations: UserUpdateAuthorizationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAuthorizations(authorizations);
    }

    validateAuthorizationExcelData(excelData: any[], vendors: Vendor[], authorizationCategories: AuthorizationCategory[], authorizationTypes: AuthorizationType[], procedures: Procedure[]) {
      return this.businessProvider.validateAuthorizationExcelData(excelData, vendors, authorizationCategories, authorizationTypes, procedures);
    }
}

