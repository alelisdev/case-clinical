
import { Module } from '@nestjs/common'
import { ApiClinicalProviderLocationDataAccessModule } from '@case-clinical/api/clinical-provider-location/data-access'

import { ApiClinicalProviderLocationFeatureAdminResolver } from './api-clinical-provider-location-feature-admin.resolver'
import { ApiClinicalProviderLocationFeaturePublicResolver } from './api-clinical-provider-location-feature-public.resolver'
import { ApiClinicalProviderLocationFeatureUserResolver } from './api-clinical-provider-location-feature-user.resolver'

@Module({
  imports: [ApiClinicalProviderLocationDataAccessModule],
  providers: [
        ApiClinicalProviderLocationFeatureAdminResolver,
        ApiClinicalProviderLocationFeaturePublicResolver,
        ApiClinicalProviderLocationFeatureUserResolver
    ],
})
export class ApiClinicalProviderLocationFeatureModule {}
