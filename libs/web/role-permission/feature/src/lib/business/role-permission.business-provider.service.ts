
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateRolePermissionAction} from './actions/create-role-permission.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {RolePermission, UserCreateRolePermissionInput, UserUpdateRolePermissionInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateRolePermissionsAction, UpdateRolePermissionAction } from './actions/update-role-permissions.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class RolePermissionBusinessProviderService extends ServiceBase {constructor(
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
  
  importRolePermissions(rolePermissions: UserUpdateRolePermissionInput[]): Observable<boolean> {
    const updateRolePermissionsAction = new UpdateRolePermissionsAction(rolePermissions);
    updateRolePermissionsAction.Do(this)
    return updateRolePermissionsAction.response;
  }
}

