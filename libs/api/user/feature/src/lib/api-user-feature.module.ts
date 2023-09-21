
import { Module } from '@nestjs/common'
import { ApiUserDataAccessModule } from '@case-clinical/api/user/data-access'

import { ApiUserFeatureAdminResolver } from './api-user-feature-admin.resolver'
import { ApiUserFeaturePublicResolver } from './api-user-feature-public.resolver'
import { ApiUserFeatureUserResolver } from './api-user-feature-user.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [
        ApiUserFeatureAdminResolver,
        ApiUserFeaturePublicResolver,
        ApiUserFeatureUserResolver
    ],
})
export class ApiUserFeatureModule {}
