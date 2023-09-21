
import { Module } from '@nestjs/common'
import { ApiBankDataAccessModule } from '@case-clinical/api/bank/data-access'

import { ApiBankFeatureAdminResolver } from './api-bank-feature-admin.resolver'
import { ApiBankFeaturePublicResolver } from './api-bank-feature-public.resolver'
import { ApiBankFeatureUserResolver } from './api-bank-feature-user.resolver'

@Module({
  imports: [ApiBankDataAccessModule],
  providers: [
        ApiBankFeatureAdminResolver,
        ApiBankFeaturePublicResolver,
        ApiBankFeatureUserResolver
    ],
})
export class ApiBankFeatureModule {}
