
import { Module } from '@nestjs/common'
import { ApiPchProviderDataAccessModule } from '@case-clinical/api/pch-provider/data-access'

import { ApiPchProviderFeatureAdminResolver } from './api-pch-provider-feature-admin.resolver'
import { ApiPchProviderFeaturePublicResolver } from './api-pch-provider-feature-public.resolver'
import { ApiPchProviderFeatureUserResolver } from './api-pch-provider-feature-user.resolver'

@Module({
  imports: [ApiPchProviderDataAccessModule],
  providers: [
        ApiPchProviderFeatureAdminResolver,
        ApiPchProviderFeaturePublicResolver,
        ApiPchProviderFeatureUserResolver
    ],
})
export class ApiPchProviderFeatureModule {}
