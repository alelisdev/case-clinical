
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateTeamRoleAction} from './actions/create-team-role.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {TeamRole, UserCreateTeamRoleInput, UserUpdateTeamRoleInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateTeamRolesAction, UpdateTeamRoleAction } from './actions/update-team-roles.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class TeamRoleBusinessProviderService extends ServiceBase {constructor(
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
  
  importTeamRoles(teamRoles: UserUpdateTeamRoleInput[]): Observable<boolean> {
    const updateTeamRolesAction = new UpdateTeamRolesAction(teamRoles);
    updateTeamRolesAction.Do(this)
    return updateTeamRolesAction.response;
  }
}

