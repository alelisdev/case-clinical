
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Role, UserCreateRoleInput, UserUpdateRoleInput } from "@case-clinical/shared/util/sdk";
import { RoleBusinessProviderService } from "./business/role.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ServiceBase {
 constructor(
  @Inject(RoleBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RoleBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RoleService", loggingService, serviceContext);
 }

    createRole(input: UserCreateRoleInput): Observable<Role> {
        return this.businessProvider.createRole(input);
    }

    updateRole(input: UserUpdateRoleInput, roleId: string): Observable<Role> {
        return this.businessProvider.updateRole(input, roleId);
    }

    importRoles(roles: UserUpdateRoleInput[]): Observable<boolean> {
        return this.businessProvider.importRoles(roles);
    }
}

