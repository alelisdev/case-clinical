
import { Module } from '@nestjs/common'
import { ApiAttorneyDataAccessModule } from '@case-clinical/api/attorney/data-access'

import { ApiAttorneyFeatureAdminResolver } from './api-attorney-feature-admin.resolver'
import { ApiAttorneyFeaturePublicResolver } from './api-attorney-feature-public.resolver'
import { ApiAttorneyFeatureUserResolver } from './api-attorney-feature-user.resolver'

@Module({
  imports: [ApiAttorneyDataAccessModule],
  providers: [
        ApiAttorneyFeatureAdminResolver,
        ApiAttorneyFeaturePublicResolver,
        ApiAttorneyFeatureUserResolver
    ],
})
export class ApiAttorneyFeatureModule {}
