
import { Module } from '@nestjs/common'
import { ApiManufacturerDataAccessModule } from '@case-clinical/api/manufacturer/data-access'

import { ApiManufacturerFeatureAdminResolver } from './api-manufacturer-feature-admin.resolver'
import { ApiManufacturerFeaturePublicResolver } from './api-manufacturer-feature-public.resolver'
import { ApiManufacturerFeatureUserResolver } from './api-manufacturer-feature-user.resolver'

@Module({
  imports: [ApiManufacturerDataAccessModule],
  providers: [
        ApiManufacturerFeatureAdminResolver,
        ApiManufacturerFeaturePublicResolver,
        ApiManufacturerFeatureUserResolver
    ],
})
export class ApiManufacturerFeatureModule {}
