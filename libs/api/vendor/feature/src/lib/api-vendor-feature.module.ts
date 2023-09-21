
import { Module } from '@nestjs/common'
import { ApiVendorDataAccessModule } from '@case-clinical/api/vendor/data-access'

import { ApiVendorFeatureAdminResolver } from './api-vendor-feature-admin.resolver'
import { ApiVendorFeaturePublicResolver } from './api-vendor-feature-public.resolver'
import { ApiVendorFeatureUserResolver } from './api-vendor-feature-user.resolver'

@Module({
  imports: [ApiVendorDataAccessModule],
  providers: [
        ApiVendorFeatureAdminResolver,
        ApiVendorFeaturePublicResolver,
        ApiVendorFeatureUserResolver
    ],
})
export class ApiVendorFeatureModule {}
