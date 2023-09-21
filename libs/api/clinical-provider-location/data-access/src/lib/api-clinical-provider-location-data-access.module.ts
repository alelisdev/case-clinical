
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClinicalProviderLocationDataAccessAdminService } from './api-clinical-provider-location-data-access-admin.service'
import { ApiClinicalProviderLocationDataAccessUserService } from './api-clinical-provider-location-data-access-user.service'
import { ApiClinicalProviderLocationDataAccessPublicService } from './api-clinical-provider-location-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClinicalProviderLocationDataAccessAdminService, ApiClinicalProviderLocationDataAccessUserService, ApiClinicalProviderLocationDataAccessPublicService],
  exports: [ApiClinicalProviderLocationDataAccessAdminService, ApiClinicalProviderLocationDataAccessUserService, ApiClinicalProviderLocationDataAccessPublicService],
})
export class ApiClinicalProviderLocationDataAccessModule {}
