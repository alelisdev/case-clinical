
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RolePermission, UserCreateRolePermissionInput, UserUpdateRolePermissionInput } from "@case-clinical/shared/util/sdk";
import { RolePermissionBusinessProviderService } from "./business/role-permission.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService extends ServiceBase {
 constructor(
  @Inject(RolePermissionBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RolePermissionBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RolePermissionService", loggingService, serviceContext);
 }

    createRolePermission(input: UserCreateRolePermissionInput): Observable<RolePermission> {
        return this.businessProvider.createRolePermission(input);
    }

    updateRolePermission(input: UserUpdateRolePermissionInput, rolePermissionId: string): Observable<RolePermission> {
        return this.businessProvider.updateRolePermission(input, rolePermissionId);
    }

    importRolePermissions(rolePermissions: UserUpdateRolePermissionInput[]): Observable<boolean> {
        return this.businessProvider.importRolePermissions(rolePermissions);
    }
}

