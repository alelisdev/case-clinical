
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiMedicalConditionDataAccessAdminService } from './api-medical-condition-data-access-admin.service'
import { ApiMedicalConditionDataAccessUserService } from './api-medical-condition-data-access-user.service'
import { ApiMedicalConditionDataAccessPublicService } from './api-medical-condition-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiMedicalConditionDataAccessAdminService, ApiMedicalConditionDataAccessUserService, ApiMedicalConditionDataAccessPublicService],
  exports: [ApiMedicalConditionDataAccessAdminService, ApiMedicalConditionDataAccessUserService, ApiMedicalConditionDataAccessPublicService],
})
export class ApiMedicalConditionDataAccessModule {}
