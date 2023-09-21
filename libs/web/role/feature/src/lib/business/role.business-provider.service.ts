
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateRoleAction} from './actions/create-role.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Role, UserCreateRoleInput, UserUpdateRoleInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateRolesAction, UpdateRoleAction } from './actions/update-roles.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class RoleBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RoleBusinessProviderService', logger, serviceContext)
  }

  createRole(input: UserCreateRoleInput): Observable<Role> {
    const action = new CreateRoleAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRole(input: UserUpdateRoleInput, roleId: string): Observable<Role> {
    const action = new UpdateRoleAction(input, roleId); 
    action.Do(this);
    return action.response;   
  }
  
  importRoles(roles: UserUpdateRoleInput[]): Observable<boolean> {
    const updateRolesAction = new UpdateRolesAction(roles);
    updateRolesAction.Do(this)
    return updateRolesAction.response;
  }
}

