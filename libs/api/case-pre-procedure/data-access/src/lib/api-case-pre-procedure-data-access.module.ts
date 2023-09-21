
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCasePreProcedureDataAccessAdminService } from './api-case-pre-procedure-data-access-admin.service'
import { ApiCasePreProcedureDataAccessUserService } from './api-case-pre-procedure-data-access-user.service'
import { ApiCasePreProcedureDataAccessPublicService } from './api-case-pre-procedure-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCasePreProcedureDataAccessAdminService, ApiCasePreProcedureDataAccessUserService, ApiCasePreProcedureDataAccessPublicService],
  exports: [ApiCasePreProcedureDataAccessAdminService, ApiCasePreProcedureDataAccessUserService, ApiCasePreProcedureDataAccessPublicService],
})
export class ApiCasePreProcedureDataAccessModule {}
