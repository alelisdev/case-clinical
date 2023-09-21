
import { Module } from '@nestjs/common'
import { ApiSurgicalPositionDataAccessModule } from '@case-clinical/api/surgical-position/data-access'

import { ApiSurgicalPositionFeatureAdminResolver } from './api-surgical-position-feature-admin.resolver'
import { ApiSurgicalPositionFeaturePublicResolver } from './api-surgical-position-feature-public.resolver'
import { ApiSurgicalPositionFeatureUserResolver } from './api-surgical-position-feature-user.resolver'

@Module({
  imports: [ApiSurgicalPositionDataAccessModule],
  providers: [
        ApiSurgicalPositionFeatureAdminResolver,
        ApiSurgicalPositionFeaturePublicResolver,
        ApiSurgicalPositionFeatureUserResolver
    ],
})
export class ApiSurgicalPositionFeatureModule {}
