
import { Module } from '@nestjs/common'
import { ApiGuidelineDataAccessModule } from '@case-clinical/api/guideline/data-access'

import { ApiGuidelineFeatureAdminResolver } from './api-guideline-feature-admin.resolver'
import { ApiGuidelineFeaturePublicResolver } from './api-guideline-feature-public.resolver'
import { ApiGuidelineFeatureUserResolver } from './api-guideline-feature-user.resolver'

@Module({
  imports: [ApiGuidelineDataAccessModule],
  providers: [
        ApiGuidelineFeatureAdminResolver,
        ApiGuidelineFeaturePublicResolver,
        ApiGuidelineFeatureUserResolver
    ],
})
export class ApiGuidelineFeatureModule {}
