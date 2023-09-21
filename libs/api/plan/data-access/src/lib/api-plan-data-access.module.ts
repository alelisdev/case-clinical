
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPlanDataAccessAdminService } from './api-plan-data-access-admin.service'
import { ApiPlanDataAccessUserService } from './api-plan-data-access-user.service'
import { ApiPlanDataAccessPublicService } from './api-plan-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPlanDataAccessAdminService, ApiPlanDataAccessUserService, ApiPlanDataAccessPublicService],
  exports: [ApiPlanDataAccessAdminService, ApiPlanDataAccessUserService, ApiPlanDataAccessPublicService],
})
export class ApiPlanDataAccessModule {}
