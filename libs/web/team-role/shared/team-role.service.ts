
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { TeamRole, UserCreateTeamRoleInput, UserUpdateTeamRoleInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { TeamRoleBusinessProviderService } from "./team-role.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createTeamRole(filteredObj);
    }

    updateTeamRole(input: UserUpdateTeamRoleInput, teamRoleId: string): Observable<TeamRole> {
        return this.businessProvider.updateTeamRole(input, teamRoleId);
    }

    importTeamRoles(teamRoles: UserUpdateTeamRoleInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTeamRoles(teamRoles);
    }

    validateTeamRoleExcelData(excelData: any[] ) {
      return this.businessProvider.validateTeamRoleExcelData(excelData );
    }
}

