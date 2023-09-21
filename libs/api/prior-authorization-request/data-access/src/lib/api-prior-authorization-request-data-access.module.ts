
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthorizationRequestDataAccessAdminService } from './api-prior-authorization-request-data-access-admin.service'
import { ApiPriorAuthorizationRequestDataAccessUserService } from './api-prior-authorization-request-data-access-user.service'
import { ApiPriorAuthorizationRequestDataAccessPublicService } from './api-prior-authorization-request-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthorizationRequestDataAccessAdminService, ApiPriorAuthorizationRequestDataAccessUserService, ApiPriorAuthorizationRequestDataAccessPublicService],
  exports: [ApiPriorAuthorizationRequestDataAccessAdminService, ApiPriorAuthorizationRequestDataAccessUserService, ApiPriorAuthorizationRequestDataAccessPublicService],
})
export class ApiPriorAuthorizationRequestDataAccessModule {}
