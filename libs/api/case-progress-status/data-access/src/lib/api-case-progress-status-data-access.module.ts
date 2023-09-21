
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCaseProgressStatusDataAccessAdminService } from './api-case-progress-status-data-access-admin.service'
import { ApiCaseProgressStatusDataAccessUserService } from './api-case-progress-status-data-access-user.service'
import { ApiCaseProgressStatusDataAccessPublicService } from './api-case-progress-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCaseProgressStatusDataAccessAdminService, ApiCaseProgressStatusDataAccessUserService, ApiCaseProgressStatusDataAccessPublicService],
  exports: [ApiCaseProgressStatusDataAccessAdminService, ApiCaseProgressStatusDataAccessUserService, ApiCaseProgressStatusDataAccessPublicService],
})
export class ApiCaseProgressStatusDataAccessModule {}
