
import { Module } from '@nestjs/common'
import { ApiReferralRequestDataAccessModule } from '@case-clinical/api/referral-request/data-access'

import { ApiReferralRequestFeatureAdminResolver } from './api-referral-request-feature-admin.resolver'
import { ApiReferralRequestFeaturePublicResolver } from './api-referral-request-feature-public.resolver'
import { ApiReferralRequestFeatureUserResolver } from './api-referral-request-feature-user.resolver'

@Module({
  imports: [ApiReferralRequestDataAccessModule],
  providers: [
        ApiReferralRequestFeatureAdminResolver,
        ApiReferralRequestFeaturePublicResolver,
        ApiReferralRequestFeatureUserResolver
    ],
})
export class ApiReferralRequestFeatureModule {}
