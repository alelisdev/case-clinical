
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAuthorizationDataAccessAdminService } from './api-authorization-data-access-admin.service'
import { ApiAuthorizationDataAccessUserService } from './api-authorization-data-access-user.service'
import { ApiAuthorizationDataAccessPublicService } from './api-authorization-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAuthorizationDataAccessAdminService, ApiAuthorizationDataAccessUserService, ApiAuthorizationDataAccessPublicService],
  exports: [ApiAuthorizationDataAccessAdminService, ApiAuthorizationDataAccessUserService, ApiAuthorizationDataAccessPublicService],
})
export class ApiAuthorizationDataAccessModule {}
