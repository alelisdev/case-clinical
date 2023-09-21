
import { Module } from '@nestjs/common'
import { ApiAccountStatusDataAccessModule } from '@case-clinical/api/account-status/data-access'

import { ApiAccountStatusFeatureAdminResolver } from './api-account-status-feature-admin.resolver'
import { ApiAccountStatusFeaturePublicResolver } from './api-account-status-feature-public.resolver'
import { ApiAccountStatusFeatureUserResolver } from './api-account-status-feature-user.resolver'

@Module({
  imports: [ApiAccountStatusDataAccessModule],
  providers: [
        ApiAccountStatusFeatureAdminResolver,
        ApiAccountStatusFeaturePublicResolver,
        ApiAccountStatusFeatureUserResolver
    ],
})
export class ApiAccountStatusFeatureModule {}
