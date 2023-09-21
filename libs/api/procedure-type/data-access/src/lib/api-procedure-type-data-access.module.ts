
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureTypeDataAccessAdminService } from './api-procedure-type-data-access-admin.service'
import { ApiProcedureTypeDataAccessUserService } from './api-procedure-type-data-access-user.service'
import { ApiProcedureTypeDataAccessPublicService } from './api-procedure-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureTypeDataAccessAdminService, ApiProcedureTypeDataAccessUserService, ApiProcedureTypeDataAccessPublicService],
  exports: [ApiProcedureTypeDataAccessAdminService, ApiProcedureTypeDataAccessUserService, ApiProcedureTypeDataAccessPublicService],
})
export class ApiProcedureTypeDataAccessModule {}
