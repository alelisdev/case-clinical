
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClinicalProviderSpecialtyDataAccessAdminService } from './api-clinical-provider-specialty-data-access-admin.service'
import { ApiClinicalProviderSpecialtyDataAccessUserService } from './api-clinical-provider-specialty-data-access-user.service'
import { ApiClinicalProviderSpecialtyDataAccessPublicService } from './api-clinical-provider-specialty-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClinicalProviderSpecialtyDataAccessAdminService, ApiClinicalProviderSpecialtyDataAccessUserService, ApiClinicalProviderSpecialtyDataAccessPublicService],
  exports: [ApiClinicalProviderSpecialtyDataAccessAdminService, ApiClinicalProviderSpecialtyDataAccessUserService, ApiClinicalProviderSpecialtyDataAccessPublicService],
})
export class ApiClinicalProviderSpecialtyDataAccessModule {}
