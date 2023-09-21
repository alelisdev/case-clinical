
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { UserRole, UserCreateUserRoleInput, UserUpdateUserRoleInput, UpdateResult, Role, User } from "@case-clinical/shared/util/sdk";
import { UserRoleBusinessProviderService } from "./user-role.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createUserRole(filteredObj);
    }

    updateUserRole(input: UserUpdateUserRoleInput, userRoleId: string): Observable<UserRole> {
        return this.businessProvider.updateUserRole(input, userRoleId);
    }

    importUserRoles(userRoles: UserUpdateUserRoleInput[]): Observable<UpdateResult> {
        return this.businessProvider.importUserRoles(userRoles);
    }

    validateUserRoleExcelData(excelData: any[], roles: Role[], users: User[]) {
      return this.businessProvider.validateUserRoleExcelData(excelData, roles, users);
    }
}

