
import { Module } from '@nestjs/common'
import { ApiContractedRateKindDataAccessModule } from '@case-clinical/api/contracted-rate-kind/data-access'

import { ApiContractedRateKindFeatureAdminResolver } from './api-contracted-rate-kind-feature-admin.resolver'
import { ApiContractedRateKindFeaturePublicResolver } from './api-contracted-rate-kind-feature-public.resolver'
import { ApiContractedRateKindFeatureUserResolver } from './api-contracted-rate-kind-feature-user.resolver'

@Module({
  imports: [ApiContractedRateKindDataAccessModule],
  providers: [
        ApiContractedRateKindFeatureAdminResolver,
        ApiContractedRateKindFeaturePublicResolver,
        ApiContractedRateKindFeatureUserResolver
    ],
})
export class ApiContractedRateKindFeatureModule {}
