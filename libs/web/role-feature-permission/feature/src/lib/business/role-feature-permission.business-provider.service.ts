
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateRoleFeaturePermissionAction} from './actions/create-role-feature-permission.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {RoleFeaturePermission, UserCreateRoleFeaturePermissionInput, UserUpdateRoleFeaturePermissionInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateRoleFeaturePermissionsAction, UpdateRoleFeaturePermissionAction } from './actions/update-role-feature-permissions.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class RoleFeaturePermissionBusinessProviderService extends ServiceBase {constructor(
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
  
  importRoleFeaturePermissions(roleFeaturePermissions: UserUpdateRoleFeaturePermissionInput[]): Observable<boolean> {
    const updateRoleFeaturePermissionsAction = new UpdateRoleFeaturePermissionsAction(roleFeaturePermissions);
    updateRoleFeaturePermissionsAction.Do(this)
    return updateRoleFeaturePermissionsAction.response;
  }
}

