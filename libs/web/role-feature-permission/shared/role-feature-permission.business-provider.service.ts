
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RoleFeaturePermission, UserCreateRoleFeaturePermissionInput, UserUpdateRoleFeaturePermissionInput, UpdateResult, FeaturePermission, Role } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRoleFeaturePermissionExcelDataAction } from './actions/validate-role-feature-permission-excel-data.action'
import { CreateRoleFeaturePermissionAction } from './actions/create-role-feature-permission.action'
import { UpdateRoleFeaturePermissionsAction, UpdateRoleFeaturePermissionAction } from './actions/update-role-feature-permissions.action'


@Injectable({providedIn: 'root',
})
export class RoleFeaturePermissionBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RoleFeaturePermissionBusinessProviderService', logger, serviceContext)
  }

  createRoleFeaturePermission(input: UserCreateRoleFeaturePermissionInput): Observable<RoleFeaturePermission> {
    const action = new CreateRoleFeaturePermissionAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRoleFeaturePermission(input: UserUpdateRoleFeaturePermissionInput, roleFeaturePermissionId: string): Observable<RoleFeaturePermission> {
    const action = new UpdateRoleFeaturePermissionAction(input, roleFeaturePermissionId); 
    action.Do(this);
    return action.response;   
  }
  
  importRoleFeaturePermissions(roleFeaturePermissions: UserUpdateRoleFeaturePermissionInput[]): Observable<UpdateResult> {
    const updateRoleFeaturePermissionsAction = new UpdateRoleFeaturePermissionsAction(roleFeaturePermissions);
    updateRoleFeaturePermissionsAction.Do(this)
    return updateRoleFeaturePermissionsAction.response;
  }

  validateRoleFeaturePermissionExcelData(excelData: any[], featurePermissions: FeaturePermission[], roles: Role[]) {
    const validateRoleFeaturePermissionExcelDataAction = new ValidateRoleFeaturePermissionExcelDataAction(excelData, featurePermissions, roles);
    validateRoleFeaturePermissionExcelDataAction.Do(this)
    return validateRoleFeaturePermissionExcelDataAction.response;
  }
}

