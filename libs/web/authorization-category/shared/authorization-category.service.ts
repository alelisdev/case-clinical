
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AuthorizationCategory, UserCreateAuthorizationCategoryInput, UserUpdateAuthorizationCategoryInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AuthorizationCategoryBusinessProviderService } from "./authorization-category.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AuthorizationCategoryService extends ServiceBase {
 constructor(
  @Inject(AuthorizationCategoryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AuthorizationCategoryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AuthorizationCategoryService", loggingService, serviceContext);
 }

    createAuthorizationCategory(input: UserCreateAuthorizationCategoryInput): Observable<AuthorizationCategory> {
        return this.businessProvider.createAuthorizationCategory(input);
    }

    updateAuthorizationCategory(input: UserUpdateAuthorizationCategoryInput, authorizationCategoryId: string): Observable<AuthorizationCategory> {
        return this.businessProvider.updateAuthorizationCategory(input, authorizationCategoryId);
    }

    importAuthorizationCategories(authorizationCategories: UserUpdateAuthorizationCategoryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAuthorizationCategories(authorizationCategories);
    }

    validateAuthorizationCategoryExcelData(excelData: any[] ) {
      return this.businessProvider.validateAuthorizationCategoryExcelData(excelData );
    }
}

