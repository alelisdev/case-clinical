
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RoleFeaturePermission, UserCreateRoleFeaturePermissionInput, UserUpdateRoleFeaturePermissionInput } from "@case-clinical/shared/util/sdk";
import { RoleFeaturePermissionBusinessProviderService } from "./business/role-feature-permission.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class RoleFeaturePermissionService extends ServiceBase {
 constructor(
  @Inject(RoleFeaturePermissionBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RoleFeaturePermissionBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RoleFeaturePermissionService", loggingService, serviceContext);
 }

    createRoleFeaturePermission(input: UserCreateRoleFeaturePermissionInput): Observable<RoleFeaturePermission> {
        return this.businessProvider.createRoleFeaturePermission(input);
    }

    updateRoleFeaturePermission(input: UserUpdateRoleFeaturePermissionInput, roleFeaturePermissionId: string): Observable<RoleFeaturePermission> {
        return this.businessProvider.updateRoleFeaturePermission(input, roleFeaturePermissionId);
    }

    importRoleFeaturePermissions(roleFeaturePermissions: UserUpdateRoleFeaturePermissionInput[]): Observable<boolean> {
        return this.businessProvider.importRoleFeaturePermissions(roleFeaturePermissions);
    }
}

