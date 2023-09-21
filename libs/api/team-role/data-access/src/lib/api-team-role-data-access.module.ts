
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTeamRoleDataAccessAdminService } from './api-team-role-data-access-admin.service'
import { ApiTeamRoleDataAccessUserService } from './api-team-role-data-access-user.service'
import { ApiTeamRoleDataAccessPublicService } from './api-team-role-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTeamRoleDataAccessAdminService, ApiTeamRoleDataAccessUserService, ApiTeamRoleDataAccessPublicService],
  exports: [ApiTeamRoleDataAccessAdminService, ApiTeamRoleDataAccessUserService, ApiTeamRoleDataAccessPublicService],
})
export class ApiTeamRoleDataAccessModule {}
