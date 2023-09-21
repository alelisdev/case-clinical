
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCaseStatusDataAccessAdminService } from './api-case-status-data-access-admin.service'
import { ApiCaseStatusDataAccessUserService } from './api-case-status-data-access-user.service'
import { ApiCaseStatusDataAccessPublicService } from './api-case-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCaseStatusDataAccessAdminService, ApiCaseStatusDataAccessUserService, ApiCaseStatusDataAccessPublicService],
  exports: [ApiCaseStatusDataAccessAdminService, ApiCaseStatusDataAccessUserService, ApiCaseStatusDataAccessPublicService],
})
export class ApiCaseStatusDataAccessModule {}
