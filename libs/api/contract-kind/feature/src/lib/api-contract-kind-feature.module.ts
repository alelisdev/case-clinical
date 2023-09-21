
import { Module } from '@nestjs/common'
import { ApiContractKindDataAccessModule } from '@case-clinical/api/contract-kind/data-access'

import { ApiContractKindFeatureAdminResolver } from './api-contract-kind-feature-admin.resolver'
import { ApiContractKindFeaturePublicResolver } from './api-contract-kind-feature-public.resolver'
import { ApiContractKindFeatureUserResolver } from './api-contract-kind-feature-user.resolver'

@Module({
  imports: [ApiContractKindDataAccessModule],
  providers: [
        ApiContractKindFeatureAdminResolver,
        ApiContractKindFeaturePublicResolver,
        ApiContractKindFeatureUserResolver
    ],
})
export class ApiContractKindFeatureModule {}
