
import { Module } from '@nestjs/common'
import { ApiUserFeatureDataAccessModule } from '@case-clinical/api/user-feature/data-access'

import { ApiUserFeatureFeatureAdminResolver } from './api-user-feature-feature-admin.resolver'
import { ApiUserFeatureFeaturePublicResolver } from './api-user-feature-feature-public.resolver'
import { ApiUserFeatureFeatureUserResolver } from './api-user-feature-feature-user.resolver'

@Module({
  imports: [ApiUserFeatureDataAccessModule],
  providers: [
        ApiUserFeatureFeatureAdminResolver,
        ApiUserFeatureFeaturePublicResolver,
        ApiUserFeatureFeatureUserResolver
    ],
})
export class ApiUserFeatureFeatureModule {}
