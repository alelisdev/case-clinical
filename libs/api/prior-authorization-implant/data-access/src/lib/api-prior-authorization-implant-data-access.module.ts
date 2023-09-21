
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthorizationImplantDataAccessAdminService } from './api-prior-authorization-implant-data-access-admin.service'
import { ApiPriorAuthorizationImplantDataAccessUserService } from './api-prior-authorization-implant-data-access-user.service'
import { ApiPriorAuthorizationImplantDataAccessPublicService } from './api-prior-authorization-implant-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthorizationImplantDataAccessAdminService, ApiPriorAuthorizationImplantDataAccessUserService, ApiPriorAuthorizationImplantDataAccessPublicService],
  exports: [ApiPriorAuthorizationImplantDataAccessAdminService, ApiPriorAuthorizationImplantDataAccessUserService, ApiPriorAuthorizationImplantDataAccessPublicService],
})
export class ApiPriorAuthorizationImplantDataAccessModule {}
