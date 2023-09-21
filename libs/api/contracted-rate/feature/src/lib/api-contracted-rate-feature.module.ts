
import { Module } from '@nestjs/common'
import { ApiContractedRateDataAccessModule } from '@case-clinical/api/contracted-rate/data-access'

import { ApiContractedRateFeatureAdminResolver } from './api-contracted-rate-feature-admin.resolver'
import { ApiContractedRateFeaturePublicResolver } from './api-contracted-rate-feature-public.resolver'
import { ApiContractedRateFeatureUserResolver } from './api-contracted-rate-feature-user.resolver'

@Module({
  imports: [ApiContractedRateDataAccessModule],
  providers: [
        ApiContractedRateFeatureAdminResolver,
        ApiContractedRateFeaturePublicResolver,
        ApiContractedRateFeatureUserResolver
    ],
})
export class ApiContractedRateFeatureModule {}
