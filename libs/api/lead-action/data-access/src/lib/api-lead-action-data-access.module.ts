
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLeadActionDataAccessAdminService } from './api-lead-action-data-access-admin.service'
import { ApiLeadActionDataAccessUserService } from './api-lead-action-data-access-user.service'
import { ApiLeadActionDataAccessPublicService } from './api-lead-action-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLeadActionDataAccessAdminService, ApiLeadActionDataAccessUserService, ApiLeadActionDataAccessPublicService],
  exports: [ApiLeadActionDataAccessAdminService, ApiLeadActionDataAccessUserService, ApiLeadActionDataAccessPublicService],
})
export class ApiLeadActionDataAccessModule {}
