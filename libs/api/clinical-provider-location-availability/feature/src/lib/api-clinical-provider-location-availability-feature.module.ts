
import { Module } from '@nestjs/common'
import { ApiClinicalProviderLocationAvailabilityDataAccessModule } from '@case-clinical/api/clinical-provider-location-availability/data-access'

import { ApiClinicalProviderLocationAvailabilityFeatureAdminResolver } from './api-clinical-provider-location-availability-feature-admin.resolver'
import { ApiClinicalProviderLocationAvailabilityFeaturePublicResolver } from './api-clinical-provider-location-availability-feature-public.resolver'
import { ApiClinicalProviderLocationAvailabilityFeatureUserResolver } from './api-clinical-provider-location-availability-feature-user.resolver'

@Module({
  imports: [ApiClinicalProviderLocationAvailabilityDataAccessModule],
  providers: [
        ApiClinicalProviderLocationAvailabilityFeatureAdminResolver,
        ApiClinicalProviderLocationAvailabilityFeaturePublicResolver,
        ApiClinicalProviderLocationAvailabilityFeatureUserResolver
    ],
})
export class ApiClinicalProviderLocationAvailabilityFeatureModule {}
