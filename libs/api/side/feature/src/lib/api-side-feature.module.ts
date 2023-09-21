
import { Module } from '@nestjs/common'
import { ApiSideDataAccessModule } from '@case-clinical/api/side/data-access'

import { ApiSideFeatureAdminResolver } from './api-side-feature-admin.resolver'
import { ApiSideFeaturePublicResolver } from './api-side-feature-public.resolver'
import { ApiSideFeatureUserResolver } from './api-side-feature-user.resolver'

@Module({
  imports: [ApiSideDataAccessModule],
  providers: [
        ApiSideFeatureAdminResolver,
        ApiSideFeaturePublicResolver,
        ApiSideFeatureUserResolver
    ],
})
export class ApiSideFeatureModule {}
