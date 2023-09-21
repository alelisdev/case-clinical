
import { Module } from '@nestjs/common'
import { ApiVendorTypeDataAccessModule } from '@case-clinical/api/vendor-type/data-access'

import { ApiVendorTypeFeatureAdminResolver } from './api-vendor-type-feature-admin.resolver'
import { ApiVendorTypeFeaturePublicResolver } from './api-vendor-type-feature-public.resolver'
import { ApiVendorTypeFeatureUserResolver } from './api-vendor-type-feature-user.resolver'

@Module({
  imports: [ApiVendorTypeDataAccessModule],
  providers: [
        ApiVendorTypeFeatureAdminResolver,
        ApiVendorTypeFeaturePublicResolver,
        ApiVendorTypeFeatureUserResolver
    ],
})
export class ApiVendorTypeFeatureModule {}
