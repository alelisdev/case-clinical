
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiGuidelineUsedDataAccessAdminService } from './api-guideline-used-data-access-admin.service'
import { ApiGuidelineUsedDataAccessUserService } from './api-guideline-used-data-access-user.service'
import { ApiGuidelineUsedDataAccessPublicService } from './api-guideline-used-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiGuidelineUsedDataAccessAdminService, ApiGuidelineUsedDataAccessUserService, ApiGuidelineUsedDataAccessPublicService],
  exports: [ApiGuidelineUsedDataAccessAdminService, ApiGuidelineUsedDataAccessUserService, ApiGuidelineUsedDataAccessPublicService],
})
export class ApiGuidelineUsedDataAccessModule {}
