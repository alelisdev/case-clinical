
import { Module } from '@nestjs/common'
import { ApiEligibilityRequestDataAccessModule } from '@case-clinical/api/eligibility-request/data-access'

import { ApiEligibilityRequestFeatureAdminResolver } from './api-eligibility-request-feature-admin.resolver'
import { ApiEligibilityRequestFeaturePublicResolver } from './api-eligibility-request-feature-public.resolver'
import { ApiEligibilityRequestFeatureUserResolver } from './api-eligibility-request-feature-user.resolver'

@Module({
  imports: [ApiEligibilityRequestDataAccessModule],
  providers: [
        ApiEligibilityRequestFeatureAdminResolver,
        ApiEligibilityRequestFeaturePublicResolver,
        ApiEligibilityRequestFeatureUserResolver
    ],
})
export class ApiEligibilityRequestFeatureModule {}
