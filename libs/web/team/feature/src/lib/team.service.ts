
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Team, UserCreateTeamInput, UserUpdateTeamInput } from "@case-clinical/shared/util/sdk";
import { TeamBusinessProviderService } from "./business/team.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class TeamService extends ServiceBase {
 constructor(
  @Inject(TeamBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TeamBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TeamService", loggingService, serviceContext);
 }

    createTeam(input: UserCreateTeamInput): Observable<Team> {
        return this.businessProvider.createTeam(input);
    }

    updateTeam(input: UserUpdateTeamInput, teamId: string): Observable<Team> {
        return this.businessProvider.updateTeam(input, teamId);
    }

    importTeams(teams: UserUpdateTeamInput[]): Observable<boolean> {
        return this.businessProvider.importTeams(teams);
    }
}

