
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureVendorStatusDataAccessAdminService } from './api-procedure-vendor-status-data-access-admin.service'
import { ApiProcedureVendorStatusDataAccessUserService } from './api-procedure-vendor-status-data-access-user.service'
import { ApiProcedureVendorStatusDataAccessPublicService } from './api-procedure-vendor-status-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureVendorStatusDataAccessAdminService, ApiProcedureVendorStatusDataAccessUserService, ApiProcedureVendorStatusDataAccessPublicService],
  exports: [ApiProcedureVendorStatusDataAccessAdminService, ApiProcedureVendorStatusDataAccessUserService, ApiProcedureVendorStatusDataAccessPublicService],
})
export class ApiProcedureVendorStatusDataAccessModule {}
