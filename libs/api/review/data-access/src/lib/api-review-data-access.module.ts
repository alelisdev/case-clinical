
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiReviewDataAccessAdminService } from './api-review-data-access-admin.service'
import { ApiReviewDataAccessUserService } from './api-review-data-access-user.service'
import { ApiReviewDataAccessPublicService } from './api-review-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiReviewDataAccessAdminService, ApiReviewDataAccessUserService, ApiReviewDataAccessPublicService],
  exports: [ApiReviewDataAccessAdminService, ApiReviewDataAccessUserService, ApiReviewDataAccessPublicService],
})
export class ApiReviewDataAccessModule {}
