
import { Module } from '@nestjs/common'
import { ApiClaimDataAccessModule } from '@case-clinical/api/claim/data-access'

import { ApiClaimFeatureAdminResolver } from './api-claim-feature-admin.resolver'
import { ApiClaimFeaturePublicResolver } from './api-claim-feature-public.resolver'
import { ApiClaimFeatureUserResolver } from './api-claim-feature-user.resolver'

@Module({
  imports: [ApiClaimDataAccessModule],
  providers: [
        ApiClaimFeatureAdminResolver,
        ApiClaimFeaturePublicResolver,
        ApiClaimFeatureUserResolver
    ],
})
export class ApiClaimFeatureModule {}
