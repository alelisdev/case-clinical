
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiExperienceDataAccessAdminService } from './api-experience-data-access-admin.service'
import { ApiExperienceDataAccessUserService } from './api-experience-data-access-user.service'
import { ApiExperienceDataAccessPublicService } from './api-experience-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiExperienceDataAccessAdminService, ApiExperienceDataAccessUserService, ApiExperienceDataAccessPublicService],
  exports: [ApiExperienceDataAccessAdminService, ApiExperienceDataAccessUserService, ApiExperienceDataAccessPublicService],
})
export class ApiExperienceDataAccessModule {}
