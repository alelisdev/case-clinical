
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiLocationDataAccessModule } from '@case-clinical/api/location/data-access'

import { ApiClinicalProviderDataAccessAdminService } from './api-clinical-provider-data-access-admin.service'
import { ApiClinicalProviderDataAccessUserService } from './api-clinical-provider-data-access-user.service'
import { ApiClinicalProviderDataAccessPublicService } from './api-clinical-provider-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiLocationDataAccessModule],
  providers: [ApiClinicalProviderDataAccessAdminService, ApiClinicalProviderDataAccessUserService, ApiClinicalProviderDataAccessPublicService],
  exports: [ApiClinicalProviderDataAccessAdminService, ApiClinicalProviderDataAccessUserService, ApiClinicalProviderDataAccessPublicService],
})
export class ApiClinicalProviderDataAccessModule {}
