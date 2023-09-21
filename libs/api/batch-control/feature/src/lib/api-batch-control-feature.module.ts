
import { Module } from '@nestjs/common'
import { ApiBatchControlDataAccessModule } from '@case-clinical/api/batch-control/data-access'

import { ApiBatchControlFeatureAdminResolver } from './api-batch-control-feature-admin.resolver'
import { ApiBatchControlFeaturePublicResolver } from './api-batch-control-feature-public.resolver'
import { ApiBatchControlFeatureUserResolver } from './api-batch-control-feature-user.resolver'

@Module({
  imports: [ApiBatchControlDataAccessModule],
  providers: [
        ApiBatchControlFeatureAdminResolver,
        ApiBatchControlFeaturePublicResolver,
        ApiBatchControlFeatureUserResolver
    ],
})
export class ApiBatchControlFeatureModule {}
