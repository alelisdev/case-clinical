
import { Module } from '@nestjs/common'
import { ApiGuidelineUsedDataAccessModule } from '@case-clinical/api/guideline-used/data-access'

import { ApiGuidelineUsedFeatureAdminResolver } from './api-guideline-used-feature-admin.resolver'
import { ApiGuidelineUsedFeaturePublicResolver } from './api-guideline-used-feature-public.resolver'
import { ApiGuidelineUsedFeatureUserResolver } from './api-guideline-used-feature-user.resolver'

@Module({
  imports: [ApiGuidelineUsedDataAccessModule],
  providers: [
        ApiGuidelineUsedFeatureAdminResolver,
        ApiGuidelineUsedFeaturePublicResolver,
        ApiGuidelineUsedFeatureUserResolver
    ],
})
export class ApiGuidelineUsedFeatureModule {}
