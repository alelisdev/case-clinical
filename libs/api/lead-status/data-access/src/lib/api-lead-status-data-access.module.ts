
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLeadStatusDataAccessAdminService } from './api-lead-status-data-access-admin.service'
import { ApiLeadStatusDataAccessUserService } from './api-lead-status-data-access-user.service'
import { ApiLeadStatusDataAccessPublicService } from './api-lead-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLeadStatusDataAccessAdminService, ApiLeadStatusDataAccessUserService, ApiLeadStatusDataAccessPublicService],
  exports: [ApiLeadStatusDataAccessAdminService, ApiLeadStatusDataAccessUserService, ApiLeadStatusDataAccessPublicService],
})
export class ApiLeadStatusDataAccessModule {}
