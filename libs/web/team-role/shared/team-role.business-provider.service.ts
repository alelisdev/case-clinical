
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { TeamRole, UserCreateTeamRoleInput, UserUpdateTeamRoleInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTeamRoleExcelDataAction } from './actions/validate-team-role-excel-data.action'
import { CreateTeamRoleAction } from './actions/create-team-role.action'
import { UpdateTeamRolesAction, UpdateTeamRoleAction } from './actions/update-team-roles.action'


@Injectable({providedIn: 'root'})
export class TeamRoleBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TeamRoleBusinessProviderService', logger, serviceContext)
  }

  createTeamRole(input: UserCreateTeamRoleInput): Observable<TeamRole> {
    const action = new CreateTeamRoleAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTeamRole(input: UserUpdateTeamRoleInput, teamRoleId: string): Observable<TeamRole> {
    const action = new UpdateTeamRoleAction(input, teamRoleId); 
    action.Do(this);
    return action.response;   
  }
  
  importTeamRoles(teamRoles: UserUpdateTeamRoleInput[]): Observable<UpdateResult> {
    const updateTeamRolesAction = new UpdateTeamRolesAction(teamRoles);
    updateTeamRolesAction.Do(this)
    return updateTeamRolesAction.response;
  }

  validateTeamRoleExcelData(excelData: any[] ) {
    const validateTeamRoleExcelDataAction = new ValidateTeamRoleExcelDataAction(excelData );
    validateTeamRoleExcelDataAction.Do(this)
    return validateTeamRoleExcelDataAction.response;
  }
}

