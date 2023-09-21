
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { TeamUser, UserCreateTeamUserInput, UserUpdateTeamUserInput } from "@case-clinical/shared/util/sdk";
import { TeamUserBusinessProviderService } from "./business/team-user.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class TeamUserService extends ServiceBase {
 constructor(
  @Inject(TeamUserBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TeamUserBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TeamUserService", loggingService, serviceContext);
 }

    createTeamUser(input: UserCreateTeamUserInput): Observable<TeamUser> {
        return this.businessProvider.createTeamUser(input);
    }

    updateTeamUser(input: UserUpdateTeamUserInput, teamUserId: string): Observable<TeamUser> {
        return this.businessProvider.updateTeamUser(input, teamUserId);
    }

    importTeamUsers(teamUsers: UserUpdateTeamUserInput[]): Observable<boolean> {
        return this.businessProvider.importTeamUsers(teamUsers);
    }
}

