
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiClaimProcedureDataAccessAdminService } from './api-claim-procedure-data-access-admin.service'
import { ApiClaimProcedureDataAccessUserService } from './api-claim-procedure-data-access-user.service'
import { ApiClaimProcedureDataAccessPublicService } from './api-claim-procedure-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiClaimProcedureDataAccessAdminService, ApiClaimProcedureDataAccessUserService, ApiClaimProcedureDataAccessPublicService],
  exports: [ApiClaimProcedureDataAccessAdminService, ApiClaimProcedureDataAccessUserService, ApiClaimProcedureDataAccessPublicService],
})
export class ApiClaimProcedureDataAccessModule {}
