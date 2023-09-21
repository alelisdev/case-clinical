
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAuthorizationTypeDataAccessAdminService } from './api-authorization-type-data-access-admin.service'
import { ApiAuthorizationTypeDataAccessUserService } from './api-authorization-type-data-access-user.service'
import { ApiAuthorizationTypeDataAccessPublicService } from './api-authorization-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAuthorizationTypeDataAccessAdminService, ApiAuthorizationTypeDataAccessUserService, ApiAuthorizationTypeDataAccessPublicService],
  exports: [ApiAuthorizationTypeDataAccessAdminService, ApiAuthorizationTypeDataAccessUserService, ApiAuthorizationTypeDataAccessPublicService],
})
export class ApiAuthorizationTypeDataAccessModule {}
