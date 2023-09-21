
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthGuidelineDataAccessAdminService } from './api-prior-auth-guideline-data-access-admin.service'
import { ApiPriorAuthGuidelineDataAccessUserService } from './api-prior-auth-guideline-data-access-user.service'
import { ApiPriorAuthGuidelineDataAccessPublicService } from './api-prior-auth-guideline-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthGuidelineDataAccessAdminService, ApiPriorAuthGuidelineDataAccessUserService, ApiPriorAuthGuidelineDataAccessPublicService],
  exports: [ApiPriorAuthGuidelineDataAccessAdminService, ApiPriorAuthGuidelineDataAccessUserService, ApiPriorAuthGuidelineDataAccessPublicService],
})
export class ApiPriorAuthGuidelineDataAccessModule {}
