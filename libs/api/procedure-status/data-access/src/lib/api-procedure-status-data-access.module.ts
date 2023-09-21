
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureStatusDataAccessAdminService } from './api-procedure-status-data-access-admin.service'
import { ApiProcedureStatusDataAccessUserService } from './api-procedure-status-data-access-user.service'
import { ApiProcedureStatusDataAccessPublicService } from './api-procedure-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureStatusDataAccessAdminService, ApiProcedureStatusDataAccessUserService, ApiProcedureStatusDataAccessPublicService],
  exports: [ApiProcedureStatusDataAccessAdminService, ApiProcedureStatusDataAccessUserService, ApiProcedureStatusDataAccessPublicService],
})
export class ApiProcedureStatusDataAccessModule {}
