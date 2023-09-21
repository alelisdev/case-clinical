
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RoleFeaturePermission, UserCreateRoleFeaturePermissionInput, UserUpdateRoleFeaturePermissionInput, UpdateResult, FeaturePermission, Role } from "@case-clinical/shared/util/sdk";
import { RoleFeaturePermissionBusinessProviderService } from "./role-feature-permission.business-provider.service";
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createRoleFeaturePermission(filteredObj);
    }

    updateRoleFeaturePermission(input: UserUpdateRoleFeaturePermissionInput, roleFeaturePermissionId: string): Observable<RoleFeaturePermission> {
        return this.businessProvider.updateRoleFeaturePermission(input, roleFeaturePermissionId);
    }

    importRoleFeaturePermissions(roleFeaturePermissions: UserUpdateRoleFeaturePermissionInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRoleFeaturePermissions(roleFeaturePermissions);
    }

    validateRoleFeaturePermissionExcelData(excelData: any[], featurePermissions: FeaturePermission[], roles: Role[]) {
      return this.businessProvider.validateRoleFeaturePermissionExcelData(excelData, featurePermissions, roles);
    }
}

