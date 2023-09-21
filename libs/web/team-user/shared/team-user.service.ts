
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { TeamUser, UserCreateTeamUserInput, UserUpdateTeamUserInput, UpdateResult, Team, User, TeamRole } from "@case-clinical/shared/util/sdk";
import { TeamUserBusinessProviderService } from "./team-user.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createTeamUser(filteredObj);
    }

    updateTeamUser(input: UserUpdateTeamUserInput, teamUserId: string): Observable<TeamUser> {
        return this.businessProvider.updateTeamUser(input, teamUserId);
    }

    importTeamUsers(teamUsers: UserUpdateTeamUserInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTeamUsers(teamUsers);
    }

    validateTeamUserExcelData(excelData: any[], teams: Team[], users: User[], teamRoles: TeamRole[]) {
      return this.businessProvider.validateTeamUserExcelData(excelData, teams, users, teamRoles);
    }
}

