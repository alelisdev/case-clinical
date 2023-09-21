
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTeamDataAccessAdminService } from './api-team-data-access-admin.service'
import { ApiTeamDataAccessUserService } from './api-team-data-access-user.service'
import { ApiTeamDataAccessPublicService } from './api-team-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTeamDataAccessAdminService, ApiTeamDataAccessUserService, ApiTeamDataAccessPublicService],
  exports: [ApiTeamDataAccessAdminService, ApiTeamDataAccessUserService, ApiTeamDataAccessPublicService],
})
export class ApiTeamDataAccessModule {}
