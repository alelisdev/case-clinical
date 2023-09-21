
import { Module } from '@nestjs/common'
import { ApiFeatureDataAccessModule } from '@case-clinical/api/feature/data-access'

import { ApiFeatureFeatureAdminResolver } from './api-feature-feature-admin.resolver'
import { ApiFeatureFeaturePublicResolver } from './api-feature-feature-public.resolver'
import { ApiFeatureFeatureUserResolver } from './api-feature-feature-user.resolver'

@Module({
  imports: [ApiFeatureDataAccessModule],
  providers: [
        ApiFeatureFeatureAdminResolver,
        ApiFeatureFeaturePublicResolver,
        ApiFeatureFeatureUserResolver
    ],
})
export class ApiFeatureFeatureModule {}
