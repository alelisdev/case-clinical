
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAuthorizationStatusDataAccessAdminService } from './api-authorization-status-data-access-admin.service'
import { ApiAuthorizationStatusDataAccessUserService } from './api-authorization-status-data-access-user.service'
import { ApiAuthorizationStatusDataAccessPublicService } from './api-authorization-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAuthorizationStatusDataAccessAdminService, ApiAuthorizationStatusDataAccessUserService, ApiAuthorizationStatusDataAccessPublicService],
  exports: [ApiAuthorizationStatusDataAccessAdminService, ApiAuthorizationStatusDataAccessUserService, ApiAuthorizationStatusDataAccessPublicService],
})
export class ApiAuthorizationStatusDataAccessModule {}
