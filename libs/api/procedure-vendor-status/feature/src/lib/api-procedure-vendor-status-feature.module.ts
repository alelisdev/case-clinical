
import { Module } from '@nestjs/common'
import { ApiProcedureVendorStatusDataAccessModule } from '@case-clinical/api/procedure-vendor-status/data-access'

import { ApiProcedureVendorStatusFeatureAdminResolver } from './api-procedure-vendor-status-feature-admin.resolver'
import { ApiProcedureVendorStatusFeaturePublicResolver } from './api-procedure-vendor-status-feature-public.resolver'
import { ApiProcedureVendorStatusFeatureUserResolver } from './api-procedure-vendor-status-feature-user.resolver'

@Module({
  imports: [ApiProcedureVendorStatusDataAccessModule],
  providers: [
        ApiProcedureVendorStatusFeatureAdminResolver,
        ApiProcedureVendorStatusFeaturePublicResolver,
        ApiProcedureVendorStatusFeatureUserResolver
    ],
})
export class ApiProcedureVendorStatusFeatureModule {}
