
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiUserDataAccessAdminService } from './api-user-data-access-admin.service'
import { ApiUserDataAccessUserService } from './api-user-data-access-user.service'
import { ApiUserDataAccessPublicService } from './api-user-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserDataAccessAdminService, ApiUserDataAccessUserService, ApiUserDataAccessPublicService],
  exports: [ApiUserDataAccessAdminService, ApiUserDataAccessUserService, ApiUserDataAccessPublicService],
})
export class ApiUserDataAccessModule {}
