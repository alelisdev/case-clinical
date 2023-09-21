
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { UserRole, UserCreateUserRoleInput, UserUpdateUserRoleInput } from "@case-clinical/shared/util/sdk";
import { UserRoleBusinessProviderService } from "./business/user-role.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends ServiceBase {
 constructor(
  @Inject(UserRoleBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: UserRoleBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("UserRoleService", loggingService, serviceContext);
 }

    createUserRole(input: UserCreateUserRoleInput): Observable<UserRole> {
        return this.businessProvider.createUserRole(input);
    }

    updateUserRole(input: UserUpdateUserRoleInput, userRoleId: string): Observable<UserRole> {
        return this.businessProvider.updateUserRole(input, userRoleId);
    }

    importUserRoles(userRoles: UserUpdateUserRoleInput[]): Observable<boolean> {
        return this.businessProvider.importUserRoles(userRoles);
    }
}

