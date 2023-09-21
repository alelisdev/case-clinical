
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLeadSourceDataAccessAdminService } from './api-lead-source-data-access-admin.service'
import { ApiLeadSourceDataAccessUserService } from './api-lead-source-data-access-user.service'
import { ApiLeadSourceDataAccessPublicService } from './api-lead-source-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLeadSourceDataAccessAdminService, ApiLeadSourceDataAccessUserService, ApiLeadSourceDataAccessPublicService],
  exports: [ApiLeadSourceDataAccessAdminService, ApiLeadSourceDataAccessUserService, ApiLeadSourceDataAccessPublicService],
})
export class ApiLeadSourceDataAccessModule {}
