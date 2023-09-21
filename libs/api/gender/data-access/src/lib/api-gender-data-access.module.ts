
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiGenderDataAccessAdminService } from './api-gender-data-access-admin.service'
import { ApiGenderDataAccessUserService } from './api-gender-data-access-user.service'
import { ApiGenderDataAccessPublicService } from './api-gender-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiGenderDataAccessAdminService, ApiGenderDataAccessUserService, ApiGenderDataAccessPublicService],
  exports: [ApiGenderDataAccessAdminService, ApiGenderDataAccessUserService, ApiGenderDataAccessPublicService],
})
export class ApiGenderDataAccessModule {}
