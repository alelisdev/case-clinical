
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClinicalProviderServiceDataAccessAdminService } from './api-clinical-provider-service-data-access-admin.service'
import { ApiClinicalProviderServiceDataAccessUserService } from './api-clinical-provider-service-data-access-user.service'
import { ApiClinicalProviderServiceDataAccessPublicService } from './api-clinical-provider-service-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClinicalProviderServiceDataAccessAdminService, ApiClinicalProviderServiceDataAccessUserService, ApiClinicalProviderServiceDataAccessPublicService],
  exports: [ApiClinicalProviderServiceDataAccessAdminService, ApiClinicalProviderServiceDataAccessUserService, ApiClinicalProviderServiceDataAccessPublicService],
})
export class ApiClinicalProviderServiceDataAccessModule {}
