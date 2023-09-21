
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClinicalProviderTagDataAccessAdminService } from './api-clinical-provider-tag-data-access-admin.service'
import { ApiClinicalProviderTagDataAccessUserService } from './api-clinical-provider-tag-data-access-user.service'
import { ApiClinicalProviderTagDataAccessPublicService } from './api-clinical-provider-tag-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClinicalProviderTagDataAccessAdminService, ApiClinicalProviderTagDataAccessUserService, ApiClinicalProviderTagDataAccessPublicService],
  exports: [ApiClinicalProviderTagDataAccessAdminService, ApiClinicalProviderTagDataAccessUserService, ApiClinicalProviderTagDataAccessPublicService],
})
export class ApiClinicalProviderTagDataAccessModule {}
