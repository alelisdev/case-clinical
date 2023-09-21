
import { Module } from '@nestjs/common'
import { ApiContractTermDataAccessModule } from '@case-clinical/api/contract-term/data-access'

import { ApiContractTermFeatureAdminResolver } from './api-contract-term-feature-admin.resolver'
import { ApiContractTermFeaturePublicResolver } from './api-contract-term-feature-public.resolver'
import { ApiContractTermFeatureUserResolver } from './api-contract-term-feature-user.resolver'

@Module({
  imports: [ApiContractTermDataAccessModule],
  providers: [
        ApiContractTermFeatureAdminResolver,
        ApiContractTermFeaturePublicResolver,
        ApiContractTermFeatureUserResolver
    ],
})
export class ApiContractTermFeatureModule {}
