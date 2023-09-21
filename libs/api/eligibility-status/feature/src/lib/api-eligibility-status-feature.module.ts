
import { Module } from '@nestjs/common'
import { ApiEligibilityStatusDataAccessModule } from '@case-clinical/api/eligibility-status/data-access'

import { ApiEligibilityStatusFeatureAdminResolver } from './api-eligibility-status-feature-admin.resolver'
import { ApiEligibilityStatusFeaturePublicResolver } from './api-eligibility-status-feature-public.resolver'
import { ApiEligibilityStatusFeatureUserResolver } from './api-eligibility-status-feature-user.resolver'

@Module({
  imports: [ApiEligibilityStatusDataAccessModule],
  providers: [
        ApiEligibilityStatusFeatureAdminResolver,
        ApiEligibilityStatusFeaturePublicResolver,
        ApiEligibilityStatusFeatureUserResolver
    ],
})
export class ApiEligibilityStatusFeatureModule {}
