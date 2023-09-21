
import { Module } from '@nestjs/common'
import { ApiLocationDataAccessModule } from '@case-clinical/api/location/data-access'

import { ApiLocationFeatureAdminResolver } from './api-location-feature-admin.resolver'
import { ApiLocationFeaturePublicResolver } from './api-location-feature-public.resolver'
import { ApiLocationFeatureUserResolver } from './api-location-feature-user.resolver'

@Module({
  imports: [ApiLocationDataAccessModule],
  providers: [
        ApiLocationFeatureAdminResolver,
        ApiLocationFeaturePublicResolver,
        ApiLocationFeatureUserResolver
    ],
})
export class ApiLocationFeatureModule {}
