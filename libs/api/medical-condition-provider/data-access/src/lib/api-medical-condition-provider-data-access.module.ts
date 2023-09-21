
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiMedicalConditionProviderDataAccessAdminService } from './api-medical-condition-provider-data-access-admin.service'
import { ApiMedicalConditionProviderDataAccessUserService } from './api-medical-condition-provider-data-access-user.service'
import { ApiMedicalConditionProviderDataAccessPublicService } from './api-medical-condition-provider-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiMedicalConditionProviderDataAccessAdminService, ApiMedicalConditionProviderDataAccessUserService, ApiMedicalConditionProviderDataAccessPublicService],
  exports: [ApiMedicalConditionProviderDataAccessAdminService, ApiMedicalConditionProviderDataAccessUserService, ApiMedicalConditionProviderDataAccessPublicService],
})
export class ApiMedicalConditionProviderDataAccessModule {}
