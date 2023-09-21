
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RolePermission, UserCreateRolePermissionInput, UserUpdateRolePermissionInput, UpdateResult, Permission } from "@case-clinical/shared/util/sdk";
import { RolePermissionBusinessProviderService } from "./role-permission.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createRolePermission(filteredObj);
    }

    updateRolePermission(input: UserUpdateRolePermissionInput, rolePermissionId: string): Observable<RolePermission> {
        return this.businessProvider.updateRolePermission(input, rolePermissionId);
    }

    importRolePermissions(rolePermissions: UserUpdateRolePermissionInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRolePermissions(rolePermissions);
    }

    validateRolePermissionExcelData(excelData: any[], permissions: Permission[]) {
      return this.businessProvider.validateRolePermissionExcelData(excelData, permissions);
    }
}

