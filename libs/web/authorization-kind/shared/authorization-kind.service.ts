
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationKind, UserCreateAuthorizationKindInput, UserUpdateAuthorizationKindInput, UpdateResult, Category } from "@case-clinical/shared/util/sdk";
import { AuthorizationKindBusinessProviderService } from "./authorization-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAuthorizationKind(filteredObj);
    }

    updateAuthorizationKind(input: UserUpdateAuthorizationKindInput, authorizationKindId: string): Observable<AuthorizationKind> {
        return this.businessProvider.updateAuthorizationKind(input, authorizationKindId);
    }

    importAuthorizationKinds(authorizationKinds: UserUpdateAuthorizationKindInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAuthorizationKinds(authorizationKinds);
    }

    validateAuthorizationKindExcelData(excelData: any[], categories: Category[]) {
      return this.businessProvider.validateAuthorizationKindExcelData(excelData, categories);
    }
}

