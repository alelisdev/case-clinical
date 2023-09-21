
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureDataAccessAdminService } from './api-procedure-data-access-admin.service'
import { ApiProcedureDataAccessUserService } from './api-procedure-data-access-user.service'
import { ApiProcedureDataAccessPublicService } from './api-procedure-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureDataAccessAdminService, ApiProcedureDataAccessUserService, ApiProcedureDataAccessPublicService],
  exports: [ApiProcedureDataAccessAdminService, ApiProcedureDataAccessUserService, ApiProcedureDataAccessPublicService],
})
export class ApiProcedureDataAccessModule {}
