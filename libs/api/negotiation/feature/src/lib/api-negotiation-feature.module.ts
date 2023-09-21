
import { Module } from '@nestjs/common'
import { ApiNegotiationDataAccessModule } from '@case-clinical/api/negotiation/data-access'

import { ApiNegotiationFeatureAdminResolver } from './api-negotiation-feature-admin.resolver'
import { ApiNegotiationFeaturePublicResolver } from './api-negotiation-feature-public.resolver'
import { ApiNegotiationFeatureUserResolver } from './api-negotiation-feature-user.resolver'

@Module({
  imports: [ApiNegotiationDataAccessModule],
  providers: [
        ApiNegotiationFeatureAdminResolver,
        ApiNegotiationFeaturePublicResolver,
        ApiNegotiationFeatureUserResolver
    ],
})
export class ApiNegotiationFeatureModule {}
