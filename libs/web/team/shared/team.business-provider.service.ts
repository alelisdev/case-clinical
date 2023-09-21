
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Team, UserCreateTeamInput, UserUpdateTeamInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTeamExcelDataAction } from './actions/validate-team-excel-data.action'
import { CreateTeamAction } from './actions/create-team.action'
import { UpdateTeamsAction, UpdateTeamAction } from './actions/update-teams.action'


@Injectable({providedIn: 'root'})
export class TeamBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importTeams(teams: UserUpdateTeamInput[]): Observable<UpdateResult> {
    const updateTeamsAction = new UpdateTeamsAction(teams);
    updateTeamsAction.Do(this)
    return updateTeamsAction.response;
  }

  validateTeamExcelData(excelData: any[] ) {
    const validateTeamExcelDataAction = new ValidateTeamExcelDataAction(excelData );
    validateTeamExcelDataAction.Do(this)
    return validateTeamExcelDataAction.response;
  }
}

