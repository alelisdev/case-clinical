
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateUserRoleAction} from './actions/create-user-role.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {UserRole, UserCreateUserRoleInput, UserUpdateUserRoleInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateUserRolesAction, UpdateUserRoleAction } from './actions/update-user-roles.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class UserRoleBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.UserRoleBusinessProviderService', logger, serviceContext)
  }

  createUserRole(input: UserCreateUserRoleInput): Observable<UserRole> {
    const action = new CreateUserRoleAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateUserRole(input: UserUpdateUserRoleInput, userRoleId: string): Observable<UserRole> {
    const action = new UpdateUserRoleAction(input, userRoleId); 
    action.Do(this);
    return action.response;   
  }
  
  importUserRoles(userRoles: UserUpdateUserRoleInput[]): Observable<boolean> {
    const updateUserRolesAction = new UpdateUserRolesAction(userRoles);
    updateUserRolesAction.Do(this)
    return updateUserRolesAction.response;
  }
}

