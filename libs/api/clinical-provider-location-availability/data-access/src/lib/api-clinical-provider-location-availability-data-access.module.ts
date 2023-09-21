
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClinicalProviderLocationAvailabilityDataAccessAdminService } from './api-clinical-provider-location-availability-data-access-admin.service'
import { ApiClinicalProviderLocationAvailabilityDataAccessUserService } from './api-clinical-provider-location-availability-data-access-user.service'
import { ApiClinicalProviderLocationAvailabilityDataAccessPublicService } from './api-clinical-provider-location-availability-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClinicalProviderLocationAvailabilityDataAccessAdminService, ApiClinicalProviderLocationAvailabilityDataAccessUserService, ApiClinicalProviderLocationAvailabilityDataAccessPublicService],
  exports: [ApiClinicalProviderLocationAvailabilityDataAccessAdminService, ApiClinicalProviderLocationAvailabilityDataAccessUserService, ApiClinicalProviderLocationAvailabilityDataAccessPublicService],
})
export class ApiClinicalProviderLocationAvailabilityDataAccessModule {}
