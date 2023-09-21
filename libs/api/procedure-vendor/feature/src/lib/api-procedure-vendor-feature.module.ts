
import { Module } from '@nestjs/common'
import { ApiProcedureVendorDataAccessModule } from '@case-clinical/api/procedure-vendor/data-access'

import { ApiProcedureVendorFeatureAdminResolver } from './api-procedure-vendor-feature-admin.resolver'
import { ApiProcedureVendorFeaturePublicResolver } from './api-procedure-vendor-feature-public.resolver'
import { ApiProcedureVendorFeatureUserResolver } from './api-procedure-vendor-feature-user.resolver'

@Module({
  imports: [ApiProcedureVendorDataAccessModule],
  providers: [
        ApiProcedureVendorFeatureAdminResolver,
        ApiProcedureVendorFeaturePublicResolver,
        ApiProcedureVendorFeatureUserResolver
    ],
})
export class ApiProcedureVendorFeatureModule {}
