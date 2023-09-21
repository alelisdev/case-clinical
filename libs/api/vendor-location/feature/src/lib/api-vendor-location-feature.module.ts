
import { Module } from '@nestjs/common'
import { ApiVendorLocationDataAccessModule } from '@case-clinical/api/vendor-location/data-access'

import { ApiVendorLocationFeatureAdminResolver } from './api-vendor-location-feature-admin.resolver'
import { ApiVendorLocationFeaturePublicResolver } from './api-vendor-location-feature-public.resolver'
import { ApiVendorLocationFeatureUserResolver } from './api-vendor-location-feature-user.resolver'

@Module({
  imports: [ApiVendorLocationDataAccessModule],
  providers: [
        ApiVendorLocationFeatureAdminResolver,
        ApiVendorLocationFeaturePublicResolver,
        ApiVendorLocationFeatureUserResolver
    ],
})
export class ApiVendorLocationFeatureModule {}
