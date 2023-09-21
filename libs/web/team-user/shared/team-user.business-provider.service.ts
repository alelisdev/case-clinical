
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { TeamUser, UserCreateTeamUserInput, UserUpdateTeamUserInput, UpdateResult, Team, User, TeamRole } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTeamUserExcelDataAction } from './actions/validate-team-user-excel-data.action'
import { CreateTeamUserAction } from './actions/create-team-user.action'
import { UpdateTeamUsersAction, UpdateTeamUserAction } from './actions/update-team-users.action'


@Injectable({providedIn: 'root'})
export class TeamUserBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TeamUserBusinessProviderService', logger, serviceContext)
  }

  createTeamUser(input: UserCreateTeamUserInput): Observable<TeamUser> {
    const action = new CreateTeamUserAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTeamUser(input: UserUpdateTeamUserInput, teamUserId: string): Observable<TeamUser> {
    const action = new UpdateTeamUserAction(input, teamUserId); 
    action.Do(this);
    return action.response;   
  }
  
  importTeamUsers(teamUsers: UserUpdateTeamUserInput[]): Observable<UpdateResult> {
    const updateTeamUsersAction = new UpdateTeamUsersAction(teamUsers);
    updateTeamUsersAction.Do(this)
    return updateTeamUsersAction.response;
  }

  validateTeamUserExcelData(excelData: any[], teams: Team[], users: User[], teamRoles: TeamRole[]) {
    const validateTeamUserExcelDataAction = new ValidateTeamUserExcelDataAction(excelData, teams, users, teamRoles);
    validateTeamUserExcelDataAction.Do(this)
    return validateTeamUserExcelDataAction.response;
  }
}

