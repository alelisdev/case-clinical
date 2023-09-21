
import { Module } from '@nestjs/common'
import { ApiReviewDataAccessModule } from '@case-clinical/api/review/data-access'

import { ApiReviewFeatureAdminResolver } from './api-review-feature-admin.resolver'
import { ApiReviewFeaturePublicResolver } from './api-review-feature-public.resolver'
import { ApiReviewFeatureUserResolver } from './api-review-feature-user.resolver'

@Module({
  imports: [ApiReviewDataAccessModule],
  providers: [
        ApiReviewFeatureAdminResolver,
        ApiReviewFeaturePublicResolver,
        ApiReviewFeatureUserResolver
    ],
})
export class ApiReviewFeatureModule {}
