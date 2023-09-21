
import { Module } from '@nestjs/common'
import { ApiFirmDataAccessModule } from '@case-clinical/api/firm/data-access'

import { ApiFirmFeatureAdminResolver } from './api-firm-feature-admin.resolver'
import { ApiFirmFeaturePublicResolver } from './api-firm-feature-public.resolver'
import { ApiFirmFeatureUserResolver } from './api-firm-feature-user.resolver'

@Module({
  imports: [ApiFirmDataAccessModule],
  providers: [
        ApiFirmFeatureAdminResolver,
        ApiFirmFeaturePublicResolver,
        ApiFirmFeatureUserResolver
    ],
})
export class ApiFirmFeatureModule {}
