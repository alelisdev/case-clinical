
import { Module } from '@nestjs/common'
import { ApiPriorAuthGuidelineDataAccessModule } from '@case-clinical/api/prior-auth-guideline/data-access'

import { ApiPriorAuthGuidelineFeatureAdminResolver } from './api-prior-auth-guideline-feature-admin.resolver'
import { ApiPriorAuthGuidelineFeaturePublicResolver } from './api-prior-auth-guideline-feature-public.resolver'
import { ApiPriorAuthGuidelineFeatureUserResolver } from './api-prior-auth-guideline-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthGuidelineDataAccessModule],
  providers: [
        ApiPriorAuthGuidelineFeatureAdminResolver,
        ApiPriorAuthGuidelineFeaturePublicResolver,
        ApiPriorAuthGuidelineFeatureUserResolver
    ],
})
export class ApiPriorAuthGuidelineFeatureModule {}
