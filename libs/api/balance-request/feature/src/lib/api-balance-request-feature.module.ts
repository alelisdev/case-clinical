
import { Module } from '@nestjs/common'
import { ApiBalanceRequestDataAccessModule } from '@case-clinical/api/balance-request/data-access'

import { ApiBalanceRequestFeatureAdminResolver } from './api-balance-request-feature-admin.resolver'
import { ApiBalanceRequestFeaturePublicResolver } from './api-balance-request-feature-public.resolver'
import { ApiBalanceRequestFeatureUserResolver } from './api-balance-request-feature-user.resolver'

@Module({
  imports: [ApiBalanceRequestDataAccessModule],
  providers: [
        ApiBalanceRequestFeatureAdminResolver,
        ApiBalanceRequestFeaturePublicResolver,
        ApiBalanceRequestFeatureUserResolver
    ],
})
export class ApiBalanceRequestFeatureModule {}
