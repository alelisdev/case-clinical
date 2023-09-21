
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Team, UserCreateTeamInput, UserUpdateTeamInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { TeamBusinessProviderService } from "./team.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createTeam(filteredObj);
    }

    updateTeam(input: UserUpdateTeamInput, teamId: string): Observable<Team> {
        return this.businessProvider.updateTeam(input, teamId);
    }

    importTeams(teams: UserUpdateTeamInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTeams(teams);
    }

    validateTeamExcelData(excelData: any[] ) {
      return this.businessProvider.validateTeamExcelData(excelData );
    }
}

