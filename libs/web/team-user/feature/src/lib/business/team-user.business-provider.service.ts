
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateTeamUserAction} from './actions/create-team-user.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {TeamUser, UserCreateTeamUserInput, UserUpdateTeamUserInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateTeamUsersAction, UpdateTeamUserAction } from './actions/update-team-users.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class TeamUserBusinessProviderService extends ServiceBase {constructor(
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
  
  importTeamUsers(teamUsers: UserUpdateTeamUserInput[]): Observable<boolean> {
    const updateTeamUsersAction = new UpdateTeamUsersAction(teamUsers);
    updateTeamUsersAction.Do(this)
    return updateTeamUsersAction.response;
  }
}

