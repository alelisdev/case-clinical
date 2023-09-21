
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationType, UserCreateAuthorizationTypeInput, UserUpdateAuthorizationTypeInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AuthorizationTypeBusinessProviderService } from "./authorization-type.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AuthorizationTypeService extends ServiceBase {
 constructor(
  @Inject(AuthorizationTypeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AuthorizationTypeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AuthorizationTypeService", loggingService, serviceContext);
 }

    createAuthorizationType(input: UserCreateAuthorizationTypeInput): Observable<AuthorizationType> {
        return this.businessProvider.createAuthorizationType(input);
    }

    updateAuthorizationType(input: UserUpdateAuthorizationTypeInput, authorizationTypeId: string): Observable<AuthorizationType> {
        return this.businessProvider.updateAuthorizationType(input, authorizationTypeId);
    }

    importAuthorizationTypes(authorizationTypes: UserUpdateAuthorizationTypeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAuthorizationTypes(authorizationTypes);
    }

    validateAuthorizationTypeExcelData(excelData: any[] ) {
      return this.businessProvider.validateAuthorizationTypeExcelData(excelData );
    }
}

