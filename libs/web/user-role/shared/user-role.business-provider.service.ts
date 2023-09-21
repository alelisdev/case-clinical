
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { UserRole, UserCreateUserRoleInput, UserUpdateUserRoleInput, UpdateResult, Role, User } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateUserRoleExcelDataAction } from './actions/validate-user-role-excel-data.action'
import { CreateUserRoleAction } from './actions/create-user-role.action'
import { UpdateUserRolesAction, UpdateUserRoleAction } from './actions/update-user-roles.action'


@Injectable({providedIn: 'root'})
export class UserRoleBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importUserRoles(userRoles: UserUpdateUserRoleInput[]): Observable<UpdateResult> {
    const updateUserRolesAction = new UpdateUserRolesAction(userRoles);
    updateUserRolesAction.Do(this)
    return updateUserRolesAction.response;
  }

  validateUserRoleExcelData(excelData: any[], roles: Role[], users: User[]) {
    const validateUserRoleExcelDataAction = new ValidateUserRoleExcelDataAction(excelData, roles, users);
    validateUserRoleExcelDataAction.Do(this)
    return validateUserRoleExcelDataAction.response;
  }
}

