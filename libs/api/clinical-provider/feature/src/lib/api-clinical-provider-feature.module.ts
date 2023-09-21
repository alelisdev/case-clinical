
import { Module } from '@nestjs/common'
import { ApiClinicalProviderDataAccessModule } from '@case-clinical/api/clinical-provider/data-access'

import { ApiClinicalProviderFeatureAdminResolver } from './api-clinical-provider-feature-admin.resolver'
import { ApiClinicalProviderFeaturePublicResolver } from './api-clinical-provider-feature-public.resolver'
import { ApiClinicalProviderFeatureUserResolver } from './api-clinical-provider-feature-user.resolver'

@Module({
  imports: [ApiClinicalProviderDataAccessModule],
  providers: [
        ApiClinicalProviderFeatureAdminResolver,
        ApiClinicalProviderFeaturePublicResolver,
        ApiClinicalProviderFeatureUserResolver
    ],
})
export class ApiClinicalProviderFeatureModule {}
