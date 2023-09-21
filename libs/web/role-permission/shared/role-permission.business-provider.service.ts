
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RolePermission, UserCreateRolePermissionInput, UserUpdateRolePermissionInput, UpdateResult, Permission } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRolePermissionExcelDataAction } from './actions/validate-role-permission-excel-data.action'
import { CreateRolePermissionAction } from './actions/create-role-permission.action'
import { UpdateRolePermissionsAction, UpdateRolePermissionAction } from './actions/update-role-permissions.action'


@Injectable({providedIn: 'root'})
export class RolePermissionBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RolePermissionBusinessProviderService', logger, serviceContext)
  }

  createRolePermission(input: UserCreateRolePermissionInput): Observable<RolePermission> {
    const action = new CreateRolePermissionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRolePermission(input: UserUpdateRolePermissionInput, rolePermissionId: string): Observable<RolePermission> {
    const action = new UpdateRolePermissionAction(input, rolePermissionId); 
    action.Do(this);
    return action.response;   
  }
  
  importRolePermissions(rolePermissions: UserUpdateRolePermissionInput[]): Observable<UpdateResult> {
    const updateRolePermissionsAction = new UpdateRolePermissionsAction(rolePermissions);
    updateRolePermissionsAction.Do(this)
    return updateRolePermissionsAction.response;
  }

  validateRolePermissionExcelData(excelData: any[], permissions: Permission[]) {
    const validateRolePermissionExcelDataAction = new ValidateRolePermissionExcelDataAction(excelData, permissions);
    validateRolePermissionExcelDataAction.Do(this)
    return validateRolePermissionExcelDataAction.response;
  }
}

