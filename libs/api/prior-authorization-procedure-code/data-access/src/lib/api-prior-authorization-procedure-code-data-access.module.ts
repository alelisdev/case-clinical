
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthorizationProcedureCodeDataAccessAdminService } from './api-prior-authorization-procedure-code-data-access-admin.service'
import { ApiPriorAuthorizationProcedureCodeDataAccessUserService } from './api-prior-authorization-procedure-code-data-access-user.service'
import { ApiPriorAuthorizationProcedureCodeDataAccessPublicService } from './api-prior-authorization-procedure-code-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthorizationProcedureCodeDataAccessAdminService, ApiPriorAuthorizationProcedureCodeDataAccessUserService, ApiPriorAuthorizationProcedureCodeDataAccessPublicService],
  exports: [ApiPriorAuthorizationProcedureCodeDataAccessAdminService, ApiPriorAuthorizationProcedureCodeDataAccessUserService, ApiPriorAuthorizationProcedureCodeDataAccessPublicService],
})
export class ApiPriorAuthorizationProcedureCodeDataAccessModule {}
