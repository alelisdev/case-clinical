
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCaseProcedureDataAccessAdminService } from './api-case-procedure-data-access-admin.service'
import { ApiCaseProcedureDataAccessUserService } from './api-case-procedure-data-access-user.service'
import { ApiCaseProcedureDataAccessPublicService } from './api-case-procedure-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCaseProcedureDataAccessAdminService, ApiCaseProcedureDataAccessUserService, ApiCaseProcedureDataAccessPublicService],
  exports: [ApiCaseProcedureDataAccessAdminService, ApiCaseProcedureDataAccessUserService, ApiCaseProcedureDataAccessPublicService],
})
export class ApiCaseProcedureDataAccessModule {}
