
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiGuidelineDataAccessAdminService } from './api-guideline-data-access-admin.service'
import { ApiGuidelineDataAccessUserService } from './api-guideline-data-access-user.service'
import { ApiGuidelineDataAccessPublicService } from './api-guideline-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiGuidelineDataAccessAdminService, ApiGuidelineDataAccessUserService, ApiGuidelineDataAccessPublicService],
  exports: [ApiGuidelineDataAccessAdminService, ApiGuidelineDataAccessUserService, ApiGuidelineDataAccessPublicService],
})
export class ApiGuidelineDataAccessModule {}
