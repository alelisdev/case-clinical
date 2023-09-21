
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiEducationDataAccessAdminService } from './api-education-data-access-admin.service'
import { ApiEducationDataAccessUserService } from './api-education-data-access-user.service'
import { ApiEducationDataAccessPublicService } from './api-education-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEducationDataAccessAdminService, ApiEducationDataAccessUserService, ApiEducationDataAccessPublicService],
  exports: [ApiEducationDataAccessAdminService, ApiEducationDataAccessUserService, ApiEducationDataAccessPublicService],
})
export class ApiEducationDataAccessModule {}
