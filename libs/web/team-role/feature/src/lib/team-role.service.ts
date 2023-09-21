
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { TeamRole, UserCreateTeamRoleInput, UserUpdateTeamRoleInput } from "@case-clinical/shared/util/sdk";
import { TeamRoleBusinessProviderService } from "./business/team-role.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class TeamRoleService extends ServiceBase {
 constructor(
  @Inject(TeamRoleBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TeamRoleBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TeamRoleService", loggingService, serviceContext);
 }

    createTeamRole(input: UserCreateTeamRoleInput): Observable<TeamRole> {
        return this.businessProvider.createTeamRole(input);
    }

    updateTeamRole(input: UserUpdateTeamRoleInput, teamRoleId: string): Observable<TeamRole> {
        return this.businessProvider.updateTeamRole(input, teamRoleId);
    }

    importTeamRoles(teamRoles: UserUpdateTeamRoleInput[]): Observable<boolean> {
        return this.businessProvider.importTeamRoles(teamRoles);
    }
}

