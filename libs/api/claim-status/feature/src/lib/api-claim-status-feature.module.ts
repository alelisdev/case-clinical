
import { Module } from '@nestjs/common'
import { ApiClaimStatusDataAccessModule } from '@case-clinical/api/claim-status/data-access'

import { ApiClaimStatusFeatureAdminResolver } from './api-claim-status-feature-admin.resolver'
import { ApiClaimStatusFeaturePublicResolver } from './api-claim-status-feature-public.resolver'
import { ApiClaimStatusFeatureUserResolver } from './api-claim-status-feature-user.resolver'

@Module({
  imports: [ApiClaimStatusDataAccessModule],
  providers: [
        ApiClaimStatusFeatureAdminResolver,
        ApiClaimStatusFeaturePublicResolver,
        ApiClaimStatusFeatureUserResolver
    ],
})
export class ApiClaimStatusFeatureModule {}
