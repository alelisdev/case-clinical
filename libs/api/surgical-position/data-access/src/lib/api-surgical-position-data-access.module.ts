
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiSurgicalPositionDataAccessAdminService } from './api-surgical-position-data-access-admin.service'
import { ApiSurgicalPositionDataAccessUserService } from './api-surgical-position-data-access-user.service'
import { ApiSurgicalPositionDataAccessPublicService } from './api-surgical-position-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSurgicalPositionDataAccessAdminService, ApiSurgicalPositionDataAccessUserService, ApiSurgicalPositionDataAccessPublicService],
  exports: [ApiSurgicalPositionDataAccessAdminService, ApiSurgicalPositionDataAccessUserService, ApiSurgicalPositionDataAccessPublicService],
})
export class ApiSurgicalPositionDataAccessModule {}
