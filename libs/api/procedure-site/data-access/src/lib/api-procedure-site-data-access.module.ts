
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureSiteDataAccessAdminService } from './api-procedure-site-data-access-admin.service'
import { ApiProcedureSiteDataAccessUserService } from './api-procedure-site-data-access-user.service'
import { ApiProcedureSiteDataAccessPublicService } from './api-procedure-site-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureSiteDataAccessAdminService, ApiProcedureSiteDataAccessUserService, ApiProcedureSiteDataAccessPublicService],
  exports: [ApiProcedureSiteDataAccessAdminService, ApiProcedureSiteDataAccessUserService, ApiProcedureSiteDataAccessPublicService],
})
export class ApiProcedureSiteDataAccessModule {}
