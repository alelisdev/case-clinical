
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAuthorizationKindDataAccessAdminService } from './api-authorization-kind-data-access-admin.service'
import { ApiAuthorizationKindDataAccessUserService } from './api-authorization-kind-data-access-user.service'
import { ApiAuthorizationKindDataAccessPublicService } from './api-authorization-kind-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAuthorizationKindDataAccessAdminService, ApiAuthorizationKindDataAccessUserService, ApiAuthorizationKindDataAccessPublicService],
  exports: [ApiAuthorizationKindDataAccessAdminService, ApiAuthorizationKindDataAccessUserService, ApiAuthorizationKindDataAccessPublicService],
})
export class ApiAuthorizationKindDataAccessModule {}
