
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFirmStatusDataAccessAdminService } from './api-firm-status-data-access-admin.service'
import { ApiFirmStatusDataAccessUserService } from './api-firm-status-data-access-user.service'
import { ApiFirmStatusDataAccessPublicService } from './api-firm-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFirmStatusDataAccessAdminService, ApiFirmStatusDataAccessUserService, ApiFirmStatusDataAccessPublicService],
  exports: [ApiFirmStatusDataAccessAdminService, ApiFirmStatusDataAccessUserService, ApiFirmStatusDataAccessPublicService],
})
export class ApiFirmStatusDataAccessModule {}
