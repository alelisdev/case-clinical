
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateTeamAction} from './actions/create-team.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Team, UserCreateTeamInput, UserUpdateTeamInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateTeamsAction, UpdateTeamAction } from './actions/update-teams.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class TeamBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TeamBusinessProviderService', logger, serviceContext)
  }

  createTeam(input: UserCreateTeamInput): Observable<Team> {
    const action = new CreateTeamAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTeam(input: UserUpdateTeamInput, teamId: string): Observable<Team> {
    const action = new UpdateTeamAction(input, teamId); 
    action.Do(this);
    return action.response;   
  }
  
  importTeams(teams: UserUpdateTeamInput[]): Observable<boolean> {
    const updateTeamsAction = new UpdateTeamsAction(teams);
    updateTeamsAction.Do(this)
    return updateTeamsAction.response;
  }
}

