
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Role, UserCreateRoleInput, UserUpdateRoleInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRoleExcelDataAction } from './actions/validate-role-excel-data.action'
import { CreateRoleAction } from './actions/create-role.action'
import { UpdateRolesAction, UpdateRoleAction } from './actions/update-roles.action'


@Injectable({providedIn: 'root'})
export class RoleBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importRoles(roles: UserUpdateRoleInput[]): Observable<UpdateResult> {
    const updateRolesAction = new UpdateRolesAction(roles);
    updateRolesAction.Do(this)
    return updateRolesAction.response;
  }

  validateRoleExcelData(excelData: any[] ) {
    const validateRoleExcelDataAction = new ValidateRoleExcelDataAction(excelData );
    validateRoleExcelDataAction.Do(this)
    return validateRoleExcelDataAction.response;
  }
}

