
import { Module } from '@nestjs/common'
import { ApiContractDataAccessModule } from '@case-clinical/api/contract/data-access'

import { ApiContractFeatureAdminResolver } from './api-contract-feature-admin.resolver'
import { ApiContractFeaturePublicResolver } from './api-contract-feature-public.resolver'
import { ApiContractFeatureUserResolver } from './api-contract-feature-user.resolver'

@Module({
  imports: [ApiContractDataAccessModule],
  providers: [
        ApiContractFeatureAdminResolver,
        ApiContractFeaturePublicResolver,
        ApiContractFeatureUserResolver
    ],
})
export class ApiContractFeatureModule {}
