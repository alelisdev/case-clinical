
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTeamUserDataAccessAdminService } from './api-team-user-data-access-admin.service'
import { ApiTeamUserDataAccessUserService } from './api-team-user-data-access-user.service'
import { ApiTeamUserDataAccessPublicService } from './api-team-user-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTeamUserDataAccessAdminService, ApiTeamUserDataAccessUserService, ApiTeamUserDataAccessPublicService],
  exports: [ApiTeamUserDataAccessAdminService, ApiTeamUserDataAccessUserService, ApiTeamUserDataAccessPublicService],
})
export class ApiTeamUserDataAccessModule {}
